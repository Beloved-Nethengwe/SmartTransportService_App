import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ChildModel } from '../../types/Child';
import { ChildApiService } from '../../services/child-api.service';
import { SessionHelper } from '../../helpers/sessionStorage.helper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',

})
export class HomeComponent  {

}
