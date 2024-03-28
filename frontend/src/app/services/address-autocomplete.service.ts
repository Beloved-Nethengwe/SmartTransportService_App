import { Injectable } from '@angular/core';
import {Location} from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;
@Injectable({
  providedIn: 'root'
})
export class AddressAutocompleteService {

  constructor() { }

  public latitude: number = 0;
  public longitude: number = 0;
  public selectedAddress: PlaceResult | undefined;

  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAutocompleteSelected: ', result.formatted_address
    );
  }

  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    this.latitude = location.latitude;
    this.longitude = location.longitude;
  }
}
