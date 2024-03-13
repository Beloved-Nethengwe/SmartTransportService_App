import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { EditChildComponent } from './components/edit-child/edit-child.component';
import { SideNavComponent } from './shared/side-nav/side-nav.component';
import { UsersComponent } from './test-components/users/users.component';
import { RoomsComponent } from './test-components/rooms/rooms.component';
import { PackagesComponent } from './test-components/packages/packages.component';

const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'children/edit/:id', component:EditChildComponent}, 
  { path:'',
    component:SideNavComponent,
    children:[
      {path:'home', component:HomeComponent}, //parent + driver
      {path:'Users', component:UsersComponent}, //driver
      {path:'Rooms', component:RoomsComponent}, //parent 
      {path:'Packages', component:PackagesComponent}, // driver
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
