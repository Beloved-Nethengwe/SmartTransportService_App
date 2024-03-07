import { Component, OnInit } from '@angular/core';
import { ChildApiService } from '../../../services/child-api.service';
import { AuthService } from '../../../services/auth.service';
import { ChildModel } from '../../../types/Child';

@Component({
  selector: 'app-component',
  templateUrl: './component.component.html',
  styleUrl: './component.component.css'
})
export class ComponentComponent implements OnInit {
  public children2: ChildModel[] = [];
  finalUuid:any
  constructor(private authService:AuthService, private childApiService:ChildApiService){}

  ngOnInit(): void {
    this.finalUuid=this.authService.uuiForChild
    console.log(this.finalUuid);
  }

  getChildren(){
    
    this.childApiService.getChildrenByParentID(this.finalUuid)
    .subscribe(
      (data)=>{
        console.log("child data",data);
        JSON.stringify(data)
        this.children2 = (data)
      },
      (error)=>{
        console.log(error);
      })
  }
}
