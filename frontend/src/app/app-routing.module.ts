import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { EditChildComponent } from './components/edit-child/edit-child.component';
import { SideNavComponent } from './shared/side-nav/side-nav.component';
import { ChildDetailsComponent } from './components/child-details/child-details.component';
import { RequestsComponent } from './components/requests/requests.component';

const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'',component:SideNavComponent,},
  {path: 'home', component:HomeComponent}, //1: parent 2: driver
  {path:'children/edit/:id', component:EditChildComponent},
  {path:'child/details', component:ChildDetailsComponent}, //1:parent
  {path:'request', component:RequestsComponent}, //2:driver
  {path:'request/transport/:schoolName', component:RequestsComponent}, //2:driver

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
