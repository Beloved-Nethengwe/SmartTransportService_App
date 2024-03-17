import { Component, OnInit } from '@angular/core';
import { transportByDestinationDto } from '../../types/Request';
import { ActivatedRoute } from '@angular/router';
import { ParentApiService } from '../../services/parent-api.service';
import { SessionHelper } from '../../helpers/sessionStorage.helper';

@Component({
  selector: 'app-request-ride',
  templateUrl: './request-ride.component.html',
  styleUrl: './request-ride.component.css'
})
export class RequestRideComponent implements OnInit {

  driverDetails: transportByDestinationDto={
    ID:'',
    IDNumber :      '',
    Name :          '',
    Surname :      '',
    CellphoneNumber: '',
    SchoolName :     ''
  }
  publicID:any
  driver$:transportByDestinationDto[]=[]
  constructor(private route: ActivatedRoute, private parentApiService:ParentApiService,private sessionHelper:SessionHelper){}
  ngOnInit(): void {
    
    this.route.paramMap.subscribe({
      next:(params)=>{
        const schoolName = params.get('child_destination')?.toUpperCase()
        this.publicID = params.get('id')
        console.log(schoolName);
        
        if (schoolName?.toUpperCase()) {
          this.parentApiService.GetDriverByChildDestination(schoolName)
          .subscribe({
            next:(response)=>{
              this.driver$=response.transportDestination
              console.log("request related",response.transportDestination);
            }
          })
        }
      }
    })
  }

  makeRequest(driverId:string){
    this.parentApiService.RequestDriver(this.publicID ,driverId,this.sessionHelper.getItem("currentUser") as string)
    .subscribe({
      next:(response)=>{
        console.log('success',response);
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

}
