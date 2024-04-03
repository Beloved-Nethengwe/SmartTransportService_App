import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { EditChildComponent } from './components/edit-child/edit-child.component';
import { SideNavComponent } from './shared/side-nav/side-nav.component';
import { ChildDetailsComponent } from './components/child-details/child-details.component';
import { RequestsComponent } from './components/requests/requests.component';
import { RequestRideComponent } from './components/request-ride/request-ride.component';
import { PendingRequestComponent } from './components/pending-request/pending-request.component';
import { AcceptedRequestComponent } from './components/accepted-request/accepted-request.component';
import { MapsComponent } from './components/maps/maps.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { CommuterComponent } from './components/commuter/commuter.component';


const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'reset', component:ResetPasswordComponent}, 
  {path:'register', component:RegisterComponent},
  {path:'',component:SideNavComponent,},
  {path:'home', component:HomeComponent}, //1: parent 2: driver
  {path:'children/edit/:id', component:EditChildComponent},
  {path:'child/details', component:ChildDetailsComponent}, //1:parent
  {path:'request', component:RequestsComponent}, //2:driver
  {path:'request/transport/:child_destination/:id/:child_name', component:RequestRideComponent}, //2:driver
  {path:'pending', component:PendingRequestComponent}, //2:parent
  {path:'accepted', component:AcceptedRequestComponent}, //2:parent
  {path:'maps', component:MapsComponent}, //2:parent
  {path:'commuter', component:CommuterComponent}, //2:parent

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
