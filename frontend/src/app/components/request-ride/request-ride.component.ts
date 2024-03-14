import { Component, OnInit } from '@angular/core';
import { transportByDestinationDto } from '../../types/Request';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-ride',
  templateUrl: './request-ride.component.html',
  styleUrl: './request-ride.component.css'
})
export class RequestRideComponent implements OnInit {

  driverDetails: transportByDestinationDto={
    IDNumber :      '',
    Name :          '',
    Surname :      '',
    CellphoneNumber: '',
    SchoolName :     ''
  }
  constructor(private route: ActivatedRoute){}
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next:(params)=>{
        const id = params.get('schoolName')
      }
    })
  }

}
