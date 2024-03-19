import { Component, OnInit } from '@angular/core';
import { ChildApiService } from '../../services/child-api.service';
import { SessionHelper } from '../../helpers/sessionStorage.helper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pending-request',
  templateUrl: './pending-request.component.html',
  styleUrl: './pending-request.component.css'
})
export class PendingRequestComponent implements OnInit {
  finalUuid:any
  public childrenDetail$:any[] = [];

  constructor(private childApiService:ChildApiService,private sessionHelper: SessionHelper){}
  
  ngOnInit(): void {
    this.finalUuid= this.sessionHelper.getItem("currentUser")
    this.GetChildrenWithPendingRequestByParentID(this.finalUuid)
  }

  GetChildrenWithPendingRequestByParentID(ParentID:string): void{
    this.childApiService.GetChildrenWithPendingRequestByParentID(ParentID)
    .subscribe(
      (data)=>{
        this.childrenDetail$=data.childRequestStatus
    })
  }
}
