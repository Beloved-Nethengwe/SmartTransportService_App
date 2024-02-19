import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoginForm } from '../../types/Auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  {

  constructor(private authService: AuthService,private router:Router){}

  form: LoginForm={
    password:'',
    email:''
  }

  submit(){
    this.authService.login(this.form)
  
    
  }
  
  isLoading(){
    return this.authService.isLoading;
  }

  navigateToRegister() {
    this.router.navigate(['/register'])
 }


}
