import { Component, Input, OnInit, computed, signal } from '@angular/core';
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

  sideNavCollapsed = signal(false)
  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val)
  }

  menuItems = signal<MenuItem[]>([
    {
      icon: 'home',
      label: 'Home',
      route: 'home',
      roles: ['1','2']
    },
    {
      icon: 'person',
      label: 'Child Details',
      route: 'child/details',
      roles: ['1']
    },
    {
      icon: 'view',
      label: 'Child Details',
      route: 'child/details',
      roles: ['1']
    },
  ]);

  profilePicSize = computed(() => this.sideNavCollapsed() ? '32' : '100' )

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
