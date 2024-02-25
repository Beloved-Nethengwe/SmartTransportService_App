import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../types/Auth';;
import { ParentApiService } from '../../services/parent-api.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
 showDriverForm: boolean = true;
constructor(private router:Router, private authService: AuthService, private parentApiService: ParentApiService){}

  form: User ={
    ID: '',
    Name: '',
    Surname: '',
    IDNumber: '',
    Address: '',
    CellphoneNumber: '',
    Password: '',
    conPassword: '',
    Email:''

  }



  toggleForm() {
    this.showDriverForm = !this.showDriverForm;
  }
  // submit(){
  //   this.authService.register(this.form)
  // }

  submit(){
    this.authService.registerAndGetUid(this.form)
  }
  navigateToSignIn() {
    this.router.navigate(['/login'])
  }

  isLoading(){
    return this.authService.isLoading;
  }

  // addParent(){
  //   this.parentApiService.addParent(this.form)
  //   .subscribe( (data: any)=>{
  //     console.log(data); 
  //   })
  // }
}
