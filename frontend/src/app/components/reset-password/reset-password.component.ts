import { Component } from '@angular/core';
import { ResetPasswordDto } from '../../types/ResetPassword';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {

  successMessage: string = 'An Email To Reset Your Password Has Been Sent, You Will Be Redirected To Login Page.';
  errorMessage: string = 'Error Occured While Sending an Email, Try Again Later';
  resetPass:ResetPasswordDto = {
    email:''
  }

  constructor(private authService :AuthService){
  }

  onSubmit(){
    this.authService.forgotPassword(this.resetPass.email)
  }

  showSuccess(){
    return this.authService.showSuccess;
    
  }

  showError(){
    return this.authService.showError;
  }

}
