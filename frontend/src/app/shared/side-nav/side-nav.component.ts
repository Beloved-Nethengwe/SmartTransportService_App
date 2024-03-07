import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sidebar',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent implements OnInit {

  constructor(private _router:Router){}

  ngOnInit(): void {
    this.isLoginRoute();
  }

  isLoginRoute(): boolean {
    if (
      this._router.isActive('/login', true) ||
      this._router.isActive('/register', true) ||
      this._router.isActive('', true) 
    ) {
      return true;
    } else {
      return false;
    }
  }
}
