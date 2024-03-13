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
import { ButtonComponent } from './shared/button/button.component';
import { EditChildComponent } from "./components/edit-child/edit-child.component";
import { UsersComponent } from './test-components/users/users.component';
import { RoomsComponent } from './test-components/rooms/rooms.component';
import { PackagesComponent } from './test-components/packages/packages.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from '@angular/material/list'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    SideNavComponent,
    AddChildFormComponent,
    ButtonComponent,
    EditChildComponent,
    UsersComponent,
    RoomsComponent,
    PackagesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule, 
    MatSidenavModule,
    MatListModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    RouterLinkActive, 
    HttpClientModule,
      BrowserAnimationsModule,
      TuiRootModule,
      TuiDialogModule,
      TuiAlertModule,
      TuiSvgModule
]
,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}],
  bootstrap: [AppComponent]
})
export class AppModule { }
