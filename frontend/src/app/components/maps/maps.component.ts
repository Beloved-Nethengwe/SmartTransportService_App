import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.css'
})
export class MapsComponent implements OnInit{
  constructor() {}
  ngOnInit(): void {}
  
  display: any;
  center: google.maps.LatLngLiteral = {
      lat: -25.757570,
      lng: 28.122180
  };
  zoom = 4;
 


}
