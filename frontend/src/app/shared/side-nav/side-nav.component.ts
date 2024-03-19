import {  Component, Input, OnInit, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SessionHelper } from '../../helpers/sessionStorage.helper';
import { TransportConstant } from '../../helpers/transportConstant';
import { AuthService } from '../../services/auth.service';

export type MenuItem = {
  icon: string,
  label: string,
  route? : string,
  roles:any
}

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css',
})
export class SideNavComponent implements OnInit {
  menu: any = [];
  role:string =''
  filteredMenu:any[]=[]
  loggedInRole:any
  loggedInName:any
  constructor(
    private _router:Router,  

    private authService:AuthService,
    ){
    
    this.menu = TransportConstant.menus;
    // const userData= this._sessionHelper.getItem("localUserData");
    // if(userData != null){
    //   // const parseObj = JSON.parse(userData as string); //as UserDto 
    //   // this.role = parseObj.RoleID;

    // }

    const parseObj = JSON.parse(this.authService.getLocalUserData());
    this.role = JSON.parse(this.authService.getLocalUserData()).RoleID;
    if(this.role =="1"){
      this.loggedInRole="Parent"
      this.loggedInName=parseObj.PName +' '+ parseObj.Surname

    }
    else{
      this.loggedInRole="Driver"
      this.loggedInName=parseObj.Name +' '+ parseObj.Surname
    }
    console.log(this.authService.getLocalUserData());
    
    this.menu.forEach((element:any) => {
      const isRolePresent = element.roles.find((role:any)=>role ==this.role)
      if(isRolePresent != undefined){
        this.filteredMenu.push(element)
      }
    });
  }
  
  
  ngOnInit(): void {
    // this.authService.localUserData.subscribe(value=>{
    //   this.role = JSON.parse(value).RoleID;
    //})
    this.isLoginRoute();

  }
  
  sideNavCollapsed = signal(false)
  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val)
  }

  profilePicSize = computed(() => this.sideNavCollapsed() ? '32' : '100' )

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
