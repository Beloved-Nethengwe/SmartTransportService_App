import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionHelper } from '../../helpers/sessionStorage.helper';
import { TransportConstant } from '../../helpers/transportConstant';
import { UserDto } from '../../types/Auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'sidebar',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent implements OnInit {
  menu: any = [];
  role:string =''
  filteredMenu:any[]=[]
  constructor(private _router:Router,  private _sessionHelper:SessionHelper , private authService:AuthService){
    
    this.menu = TransportConstant.menus;
    const userData= this._sessionHelper.getItem("localUserData");
    if(userData != null){
      const parseObj = JSON.parse(userData as string); //as UserDto 
      this.role = parseObj.RoleID;
    }
    this.menu.forEach((element:any) => {
      const isRolePresent = element.roles.find((role:any)=>role ==this.role)
      if(isRolePresent != undefined){
        this.filteredMenu.push(element)
      }
    });
  }

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

  logout() {
    return this.authService.logout()
  }
  
}
