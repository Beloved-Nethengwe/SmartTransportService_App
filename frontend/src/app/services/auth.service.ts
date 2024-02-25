import { Injectable } from '@angular/core';
import { LoginForm, User } from '../types/Auth';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword ,signOut} from 'firebase/auth';
import {  Router } from '@angular/router';
import { ParentApiService } from './parent-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated:boolean=false;
  isLoading:boolean=false;
  passwordMatch:boolean =true;
  userUuid:Object={};
  public uuiForChild:any;
  constructor(private router :Router, private parentApiService: ParentApiService,) { }

  login(form: LoginForm){
    if (this.isLoading) return;
    console.log(form.email);
    console.log(form.password);
    
    this.isLoading=true;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, form.email, form.password)
    .then((userCredential:Object) => {
    // Signed in 
    console.log("uuid :",userCredential);
    this.userUuid=userCredential;
    
    const currUser =auth.currentUser;
    this.uuiForChild=currUser?.uid;
    
    this.isAuthenticated = true;
    
    this.router.navigate(['/home'])
    })
    .catch((error:string) => {
      this.isAuthenticated=false;
    })
    .finally(()=>{
      this.isLoading=false;
    });
  }
  
  
  register(form: User){
    if (this.isLoading) return;
    
    this.isLoading=true

    if (form.Password != form.conPassword) {
      this.passwordMatch = false;
      return;
    }
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, form.Email, form.Password)
    .then((userCredential:any) => {
        this.isAuthenticated=true;
    })
    .catch((error:any) => {
    this.isAuthenticated=false;
    const errorCode = error.code;
    const errorMessage = error.message;

    }).finally(()=>{
  this.isLoading=false;
    });
  }
  
  async registerAndGetUid(form:User){
    const auth = getAuth();
    try {
      const userCredential= await createUserWithEmailAndPassword(auth, form.Email, form.Password)
      if (userCredential && userCredential.user) {
        const uid = userCredential.user.uid;
        form.ID = uid;
        console.log("form with guid",form);
        this.parentApiService.addParent(form)
        .subscribe( (data: any)=>{
        console.log("this is data uid",data); 
        })
        
      }

      
    } catch (error:any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      
    }

  }

  logout(){

    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      this.router.navigate(['/login'])
      this.isAuthenticated=false;
    }).catch((error:any) => {
  // An error happened.
    });
  }

}

