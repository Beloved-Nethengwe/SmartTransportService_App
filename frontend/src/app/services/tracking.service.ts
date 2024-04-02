import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
declare const L: any;

@Injectable({
  providedIn: 'root',
})

export class TrackingService {
  constructor() {}
  myMap:any
  getCurrentLocation() {
    if (!navigator.geolocation) {
      throw new Error('L is not supported');
    }

    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      const latLng = [ coords.latitude, coords.longitude ];
      this.myMap = L.map('map').setView(latLng, 13);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        watch: true
      }).addTo(this.myMap);

      L.marker(latLng)
        .addTo(this.myMap)
        .bindPopup('Driver Location')
        .openPopup();
    });

  }

  updateMarker(array:any){
    L.marker(array)
        .addTo(this.myMap)
        .bindPopup('Driver Location')
        .openPopup();
  }
}
