import { Injectable } from '@angular/core';
import { LoginForm, User } from '../types/Auth';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword ,signOut} from 'firebase/auth';
import {  Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated:boolean=false;
  isLoading:boolean=false;
  passwordMatch:boolean =true;
  constructor(private router :Router) { }

  login(form: LoginForm){
    if (this.isLoading) return;
    console.log(form.email);
    console.log(form.password);
    
    this.isLoading=true;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, form.email, form.password)
    .then((userCredential:any) => {
    // Signed in 
    console.log(userCredential);
    
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
