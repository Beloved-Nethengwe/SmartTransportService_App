import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ChildModel } from '../../types/Child';
import { ChildApiService } from '../../services/child-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  finalUuid:any
  open:boolean = false;
  constructor(private authService:AuthService, private childApiService:ChildApiService){}
  ngOnInit(): void {
    this.form.ParentID=this.authService.uuiForChild
    console.log(this.form.ParentID);
    
  }
  form: ChildModel={
    Name:'',
    Surname:'',
    Allergy:'',
    EmergContact:'',
    PickUp:'',
    Destination:'',
    ParentID:''
  }
  
  logout() {
    return this.authService.logout()

  }

  onSubmitForNewChild(){

    console.log('uuid along with child' ,this.form.ParentID);
    console.log('formData' ,this.form);
  
    this.childApiService.addChild(this.form)
    .subscribe(data=>{
      console.log('DATA',data);
      
    })
  }



  showDialog(): void {
      this.open = true;
  }
}
