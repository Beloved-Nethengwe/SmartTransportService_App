import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ChildModel } from '../../types/Child';
import { AuthService } from '../../services/auth.service';
import { ChildApiService } from '../../services/child-api.service';
import { SessionHelper } from '../../helpers/sessionStorage.helper';
import { Router } from '@angular/router';
import {Location, Appearance, GermanAddress} from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'add-child-button',
  templateUrl: './add-child-form.component.html',
  styleUrl: './add-child-form.component.css'
})
export class AddChildFormComponent implements OnInit {
  open:boolean = false;
  finalUuid:any
  form: ChildModel={
    Name:'',
    Surname:'',
    Allergy:'',
    EmergContact:'',
    PickUp:'',
    Destination:'',
    ParentID:''
  }

  constructor(private authService:AuthService, private childApiService:ChildApiService,private sessionHelper: SessionHelper,private router:Router){}
  ngOnInit(): void {
    this.finalUuid= this.sessionHelper.getItem("currentUser");
  }

  showDialog(): void {
    this.open = true;
  }
  
  onSubmitForNewChild(){
    
    console.log(this.form);
    this.form.ParentID = this.finalUuid;
    console.log(this.form.ParentID);
    
    console.log('uuid along with child: ' ,this.finalUuid);
    console.log('formData' ,this.form);
    this.childApiService.addChild(this.form)
    .subscribe(data=>{
      console.log('DATA',data);
      window.location.reload();
    })
  }


  public latitude: number = 0;
  public longitude: number = 0;
  public selectedAddress: PlaceResult | undefined;

  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAutocompleteSelected: ', result);
  }

  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    this.latitude = location.latitude;
    this.longitude = location.longitude;
  }
}
