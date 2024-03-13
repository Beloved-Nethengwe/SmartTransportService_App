import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ChildApiService } from '../../services/child-api.service';
import { SessionHelper } from '../../helpers/sessionStorage.helper';
import { Router } from '@angular/router';
import { ChildModel } from '../../types/Child';

@Component({
  selector: 'app-child-details',
  templateUrl: './child-details.component.html',
  styleUrl: './child-details.component.css'
})
export class ChildDetailsComponent implements OnInit {
  finalUuid:any
  public childrenDetail$:any[] = [];

  constructor(private authService:AuthService, private childApiService:ChildApiService,private sessionHelper: SessionHelper,private router:Router){}
  
  ngOnInit(): void {
    this.finalUuid= this.sessionHelper.getItem("currentUser")
    this.getChildren(this.finalUuid)
  }

  getChildren(ParentID:string): void{
    console.log(this.finalUuid);
    
    this.childApiService.getChildrenByParentID(ParentID)
    .subscribe(
      (data)=>{
        console.log("child data",data.children);
        this.childrenDetail$=data.children
        
        
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
