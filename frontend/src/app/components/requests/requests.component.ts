import { Component, OnInit } from '@angular/core';
import { SessionHelper } from '../../helpers/sessionStorage.helper';
import { DriverApiService } from '../../services/driver-api.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.css'
})
export class RequestsComponent implements OnInit{
  finalUuid:any
  public requestDetails$:any[] = [];

  constructor(private sessionHelper: SessionHelper, private driverApiService: DriverApiService){}

  ngOnInit(): void {
    this.finalUuid= this.sessionHelper.getItem("currentUser");
    this.getRequestsForDriverByID(this.finalUuid);
  }

  getRequestsForDriverByID(driverID: string):void{
    this.driverApiService.getRequestsForDriver(driverID)
    .subscribe(
      (data)=>{
        this.requestDetails$=data.requests;
        console.log(this.requestDetails$);
      }
    )
  }
}
