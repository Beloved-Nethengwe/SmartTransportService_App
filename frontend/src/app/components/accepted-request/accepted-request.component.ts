import { Component, OnInit } from '@angular/core';
import { ChildApiService } from '../../services/child-api.service';
import { SessionHelper } from '../../helpers/sessionStorage.helper';

@Component({
  selector: 'app-accepted-request',
  templateUrl: './accepted-request.component.html',
  styleUrl: './accepted-request.component.css'
})
export class AcceptedRequestComponent implements OnInit {
  finalUuid:any
  public childrenDetail$:any[] = [];

  constructor(private childApiService:ChildApiService,private sessionHelper: SessionHelper){}

  ngOnInit(): void {
    this.finalUuid= this.sessionHelper.getItem("currentUser")
    this.GetChildrenWithAssignedStatusByParentID(this.finalUuid);
  }
  
  GetChildrenWithAssignedStatusByParentID(ParentID:string): void{
    this.childApiService.GetChildrenWithAssignedRequestByParentID(ParentID)
    .subscribe(
      (data)=>{
        console.log(data.childRequestStatus);
        this.childrenDetail$=data.childRequestStatus;
    })
  }

}
