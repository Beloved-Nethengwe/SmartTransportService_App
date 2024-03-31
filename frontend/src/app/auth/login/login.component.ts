import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoginForm } from '../../types/Auth';
import { Router } from '@angular/router';
import { ErrorHandlingService } from '../../services/error-handling.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements AfterViewInit  {
  @ViewChild('myForm') myForm: any;
  constructor(private authService: AuthService,private router:Router, private errorHandlingService:ErrorHandlingService){}
  ngAfterViewInit(){
  
  }

  form: LoginForm={
    password:'',
    email:''
  }

  submit(){
    this.authService.login(this.form)
  }

  checkForUserByEmail(){

      this.errorHandlingService.checkIfEmailExists(this.form.email)
      .subscribe({
        next:(respone)=>{
          if(respone.exists==false){
            console.log('email does not exist, create an account');
          }
          console.log(respone.exists);
          
        }
      })
  }
  
  isLoading(){
    return this.authService.isLoading;
  }

  navigateToRegister() {
    this.router.navigate(['/register'])
  }
}
