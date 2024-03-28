import { AfterViewInit, Component,OnInit } from '@angular/core';
import { ChildModel } from '../../types/Child';
import { ChildApiService } from '../../services/child-api.service';
import { SessionHelper } from '../../helpers/sessionStorage.helper';
import {Location,} from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;
import { AddressAutocompleteService } from '../../services/address-autocomplete.service';

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

  constructor(
  private childApiService:ChildApiService,
  private sessionHelper: SessionHelper,
  private autocompletService: AddressAutocompleteService
  ){}
  
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
  
  onAutocompleteSelected(result: PlaceResult) {
    this.autocompletService.onAutocompleteSelected(result);
  }

  onLocationSelected(location: Location) {
    this.autocompletService.onLocationSelected(location)
  }
}
