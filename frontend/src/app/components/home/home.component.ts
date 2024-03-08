import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ChildModel } from '../../types/Child';
import { ChildApiService } from '../../services/child-api.service';
import { SessionHelper } from '../../helpers/sessionStorage.helper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',

})
export class HomeComponent implements OnInit {
  finalUuid:any
  open:boolean = false;
  public childrenDetail$: any[] = [];
  users$: any[]=[];
  currentUser:string=''

  constructor(private authService:AuthService, private childApiService:ChildApiService,private sessionHelper: SessionHelper,private router:Router){}
  ngOnInit(): void {
    this.finalUuid= this.sessionHelper.getItem("currentUser")
    this.getChildren(this.finalUuid)
    
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
    
    console.log(this.form);
    this.form.ParentID = this.finalUuid;
    console.log(this.form.ParentID);
    
    console.log('uuid along with child: ' ,this.finalUuid);
    console.log('formData' ,this.form);
    
    this.childApiService.addChild(this.form)
    .subscribe(data=>{
      console.log('DATA',data);
    })
  }
  
  showDialog(): void {
    this.open = true;
  }
  
  getChildren(ParentID:string): void{
    console.log(this.finalUuid);
    
    this.childApiService.getChildrenByParentID(ParentID)
    .subscribe(
      (data)=>{
        console.log("child data",data.children);
        this.childrenDetail$ = data.children
        
      })
  }
  deleteChild(id:any,){
    this.childApiService.deleteChild(id)
    .subscribe({
      next: (data)=>{
      
        this.router.navigate(['home'])
      }})
  }
}
