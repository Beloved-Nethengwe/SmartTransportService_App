import { Component } from '@angular/core';
import { ChildModel } from '../../types/Child';
import { AuthService } from '../../services/auth.service';
import { ChildApiService } from '../../services/child-api.service';
import { SessionHelper } from '../../helpers/sessionStorage.helper';
import { Router } from '@angular/router';

@Component({
  selector: 'add-child-button',
  templateUrl: './add-child-form.component.html',
  styleUrl: './add-child-form.component.css'
})
export class AddChildFormComponent {
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
    this.finalUuid= this.sessionHelper.getItem("currentUser")    
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
}
