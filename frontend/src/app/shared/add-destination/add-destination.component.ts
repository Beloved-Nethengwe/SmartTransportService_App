import { Component, OnInit } from '@angular/core';
import { DestinationDto } from '../../types/Destination';
import { SessionHelper } from '../../helpers/sessionStorage.helper';
import { AddressAutocompleteService } from '../../services/address-autocomplete.service';
import { DestinationApiService } from '../../services/destination-api.service';
import PlaceResult = google.maps.places.PlaceResult;
import {Location,} from '@angular-material-extensions/google-maps-autocomplete';
@Component({
  selector: 'app-add-destination',
  templateUrl: './add-destination.component.html',
  styleUrl: './add-destination.component.css'
})
export class AddDestinationComponent implements OnInit {
  open:boolean = false;
  finalUuid:any
  form:DestinationDto={
    SchoolName:'',
    DriverID: ''
  }

  constructor(
    private destinationApiService:DestinationApiService,
    private sessionHelper: SessionHelper,
    private autocompletService: AddressAutocompleteService
  ){}
  
  ngOnInit(): void {
    this.finalUuid= this.sessionHelper.getItem("currentUser");
  }
  showDialog(): void {
    this.open = true;
  }

  onSubmitForAddress(){
    
    console.log(this.form);
    this.form.DriverID=this.finalUuid;
    console.log('uuid along with destination: ' ,this.finalUuid);
    console.log('formData' ,this.form);
    this.destinationApiService.addDestination(this.form)
    .subscribe(data=>{
      console.log('DATA',data);
      window.location.reload();
    })
  }

  onAutocompleteSelected(result: PlaceResult) {
    this.autocompletService.onAutocompleteSelected(result);
  }

  onLocationSelected(location: Location) {
    this.autocompletService.onLocationSelected(location)
  }
}
