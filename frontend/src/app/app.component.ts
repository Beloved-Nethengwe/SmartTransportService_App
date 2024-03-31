import { Component, OnInit, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase.config';

@Component({
  selector:'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  
  ngOnInit(): void {
    initializeApp(firebaseConfig)
  }

  constructor (private authService:AuthService,private _router:Router){}
  collapsed = signal(false)

  sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px')

  logout() {
    return this.authService.logout()
  }

  isLoginRoute(): boolean {
    if (
      this._router.isActive('/login', true) ||
      this._router.isActive('/register', true) ||
      this._router.isActive('/reset', true) ||
      this._router.isActive('', true) 
    ) {
      return true;
    } else {
      return false;
    }
  }
}