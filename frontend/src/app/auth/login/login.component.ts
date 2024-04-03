import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoginForm } from '../../types/Auth';
import { Router } from '@angular/router';
import { ErrorHandlingService } from '../../services/error-handling.service';
import { TrackingService} from '../../services/tracking.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements AfterViewInit, OnInit  {
  @ViewChild('myForm') myForm: any;
  constructor(private authService: AuthService,private router:Router, private errorHandlingService:ErrorHandlingService, private trackingService: TrackingService){}
  ngAfterViewInit(){
  
  }

  ngOnInit(): void {
                    // this.trackingService.getCurrentLocation()
  }

  form: LoginForm={
    password:'',
    email:''
  }

  async submit(){
    const rr = await this.authService.login(this.form);
    console.log(rr);
    
  }
  
  isLoading(){
    return this.authService.isLoading;
  }

  navigateToRegister() {
    this.router.navigate(['/register'])
  }

  showError(){
    return this.authService.showError;
  }

  showErrorMessage(){
    return this.authService.errorMessage = 'Invalid username or password, try again!';
  }
}
