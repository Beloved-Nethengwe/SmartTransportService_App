import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ChildModel } from '../../types/Child';
import { ChildApiService } from '../../services/child-api.service';
import { SessionHelper } from '../../helpers/sessionStorage.helper';
import { Router } from '@angular/router';
import { TrackingService } from '../../services/tracking.service';

declare const L: any;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.css',
})
export class MapsComponent implements OnInit {
  
  constructor(private trackingService: TrackingService) {}
  ngOnInit(): void {
    this.trackingService.getCurrentLocation();
    this.watchPosition()
  }

  watchPosition() {
    
    let desLat = 0;
    let desLon = 0;

    let id = navigator.geolocation.watchPosition((position) => {
      const coords = position.coords;
      const latLng = [ coords.latitude, coords.longitude ];
      this.trackingService.updateMarker(latLng);
      if (position.coords.latitude===desLat) {
        navigator.geolocation.clearWatch(id);
      }
    },
    (err) => {
      throw err
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    })
  }
}
