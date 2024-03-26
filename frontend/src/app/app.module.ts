import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TUI_SANITIZER, TuiSvgModule } from "@taiga-ui/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { SideNavComponent } from './shared/side-nav/side-nav.component';
import { AddChildFormComponent } from './shared/add-child-form/add-child-form.component';
import { EditChildComponent } from "./components/edit-child/edit-child.component";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from '@angular/material/list';
import { ChildDetailsComponent } from './components/child-details/child-details.component';
import { RequestsComponent } from './components/requests/requests.component';
import { RequestRideComponent } from './components/request-ride/request-ride.component';
import { PendingRequestComponent } from './components/pending-request/pending-request.component';
import { AcceptedRequestComponent } from './components/accepted-request/accepted-request.component';
import { GoogleMapsModule } from "@angular/google-maps";
import { MapsComponent } from './components/maps/maps.component';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { AddDestinationComponent } from './shared/add-destination/add-destination.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AddChildFormComponent,
    EditChildComponent,
    SideNavComponent,
    ChildDetailsComponent,
    RequestsComponent,
    RequestRideComponent,
    PendingRequestComponent,
    AcceptedRequestComponent,
    MapsComponent,
    AddDestinationComponent,
  ],
  imports: [
    GoogleMapsModule,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
      BrowserAnimationsModule,
      TuiRootModule,
      TuiDialogModule,
      TuiAlertModule,
      TuiSvgModule,
    RouterOutlet, 
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    RouterLink,
    RouterLinkActive ,
    MatIconModule,
    MatGoogleMapsAutocompleteModule.forRoot('AIzaSyCPbHF4QoDwahXKUs0EPfnjrXz10e_Sl6A')
]
,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}],
  bootstrap: [AppComponent]
})
export class AppModule { }
