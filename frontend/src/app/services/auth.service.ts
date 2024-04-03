import { Injectable } from '@angular/core';
import { DriverDto, LoginForm, User } from '../types/Auth';
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { Router } from '@angular/router';
import { ParentApiService } from './parent-api.service';

import { SessionHelper } from '../helpers/sessionStorage.helper';
import { DriverApiService } from './driver-api.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  successMessage: string = '';
  errorMessage: any = '';
  showSuccess: boolean = false;
  showError: boolean = false;
  isAuthenticated: boolean = false;
  isLoading: boolean = false;
  passwordMatch: boolean = true;
  userUuid: Object = {};
  public uuiForChild: any;

  public localUserData: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private router: Router,
    private parentApiService: ParentApiService,
    private sessionHelper: SessionHelper,
    private driverApiService: DriverApiService
  ) {}

  getLocalUserData(): any {
    if (this.localUserData.value == undefined) {
      this.setLocalUserData();
    }
    return this.localUserData.value;
  }

  setLocalUserData(): void {
    this.localUserData.next(this.sessionHelper.getItem('localUserData'));
  }

  userPersonalDetails(): any {
    return { name: 'bee', surname: 'gysyfs', age: 11 };
  }

  async login(form: LoginForm) {
    if (this.isLoading) return;

    this.isLoading = true;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential: Object) => {
        // Signed in
        const currUser = auth.currentUser;
        
        this.userUuid = userCredential;
        this.uuiForChild = currUser?.uid;;
        this.sessionHelper.setItem('currentUser', this.uuiForChild);
        this.isAuthenticated = true;

        this.parentApiService
          .getLoggedInParentRole(this.sessionHelper.getItem('currentUser'))
          .subscribe({
            next: (result: any) => {
              this.showError = false;
              if (result.parent) {
                this.sessionHelper.setItem(
                  'localUserData',
                  JSON.stringify(result.parent)
                );
                this.router.navigate(['/home']);
              }
            },
            error: (err) => {
              this.showError = false;
              this.driverApiService
                .getLoggedInDriverRole(
                  this.sessionHelper.getItem('currentUser')
                )
                .subscribe({
                  next: (result: any) => {
                    if (result.post) {
                      this.sessionHelper.setItem(
                        'localUserData',
                        JSON.stringify(result.post)
                      );
                      this.router.navigate(['/home']);
                    }
                  },
                  error: () => {},
                });
            },
          });
      })
      .catch((error: any) => {
        this.showError = true;
        console.log();
        
        this.isAuthenticated = false;
        this.errorMessage = error;
        
        return error;
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  register(form: User) {
    if (this.isLoading) return;

    this.isLoading = true;

    if (form.Password != form.conPassword) {
      this.passwordMatch = false;
      return;
    }
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, form.Email, form.Password)
      .then((userCredential: any) => {
        this.isAuthenticated = true;
      })
      .catch((error: any) => {
        this.isAuthenticated = false;
        const errorCode = error.code;
        const errorMessage = error.message;
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  async registerAndGetUidParent(form: User) {
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.Email,
        form.Password
      );
      if (userCredential && userCredential.user) {
        const uid = userCredential.user.uid;
        form.ID = uid;
        console.log(form.ID);
        form.roleId = 1;
        console.log('form with guid', form);
        this.parentApiService.addParent(form).subscribe((data: any) => {
          console.log('this is data uid', data);
          this.showSuccess = true;
          setTimeout(() => {
            this.showSuccess = false;
            this.router.navigate(['/login']);
          }, 5000);
        });
      }
    } catch (error: any) {
      this.showError = true;
      setTimeout(() => {
        this.showError = false;
      }, 5000);
      const errorMessage = error.message;
      console.log(errorMessage);
    }
  }

  async registerAndGetUidDriver(driverForm: DriverDto) {
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        driverForm.Email,
        driverForm.Password
      );
      if (userCredential && userCredential.user) {
        const uid = userCredential.user.uid;
        driverForm.ID = uid;
        driverForm.roleId = 2;
        console.log('form with guid', driverForm);
        this.driverApiService.addDriver(driverForm).subscribe((data: any) => {
          console.log('this is data uid', data);
          this.showSuccess = true;
          setTimeout(() => {
            this.showSuccess = false;
            this.router.navigate(['/login']);
          }, 5000);
        });
      }
    } catch (error: any) {
      this.showError = true;
      setTimeout(() => {
        this.showError = false;
      }, 5000);
      const errorMessage = error.message;
      console.log(errorMessage);
    }
  }

  logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        this.router.navigate(['/login']);
        this.sessionHelper.removeItem('currentUser');
        this.sessionHelper.removeItem('localUserData');
        this.isAuthenticated = false;
      })
      .catch((error: any) => {
        // An error happened.
      });

    this.localUserData.next(undefined);
  }

  forgotPassword(email: string) {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email).then(() => {
      this.showSuccess = true;
      console.log('successfuly done');
      setTimeout(() => {
        this.showSuccess = false;
        this.router.navigate(['/login']);
      }, 5000);
    }),
      (err: any) => {
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
          this.router.navigate(['/login']);
        }, 5000);
      };
  }
}
