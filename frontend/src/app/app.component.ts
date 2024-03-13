import { Component } from '@angular/core';
import{OnInit} from '@angular/core';
import { firebaseConfig } from './firebase.config';
import { initializeApp } from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
 
  ngOnInit(): void {
    initializeApp(firebaseConfig)
  }
}
