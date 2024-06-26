import { Component, OnInit } from '@angular/core';
import { transportByDestinationDto } from '../../types/Request';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ParentApiService } from '../../services/parent-api.service';
import { SessionHelper } from '../../helpers/sessionStorage.helper';
import { SendMailApiService } from '../../services/send-mail-api.service';

@Component({
  selector: 'app-request-ride',
  templateUrl: './request-ride.component.html',
  styleUrl: './request-ride.component.css',
})
export class RequestRideComponent implements OnInit {
  isLoading:boolean=false;
  publicID: any;
  publicChildName:string='';
  driver$: transportByDestinationDto[] = [];
  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private parentApiService: ParentApiService,
    private sessionHelper: SessionHelper,
    private mailApiService:SendMailApiService
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const schoolName = params.get('child_destination'); //?.toUpperCase()
        this.publicID = params.get('id');
        this.publicChildName = params.get('child_name') as string;
        console.log(this.publicChildName);

        if (schoolName?.toUpperCase()) {
          this.parentApiService
            .GetDriverByChildDestination(schoolName)
            .subscribe({
              next: (response) => {
                this.driver$ = response.transportDestination;
                console.log('request related', this.driver$);
              },
            });
        }
      },
    });
  }

  makeRequest(driverId: string) {
    if (this.isLoading) return;
    this.isLoading=true;

    this.parentApiService
      .RequestDriver(
        this.publicID,
        driverId,
        this.sessionHelper.getItem('currentUser') as string
      )
      .subscribe({
        next: (response) => {
          console.log('success', response);
          this.isLoading = false;
          this.router.navigate(['/pending'])
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
        },
      });
  }

  sendRequestMailToDriver(email:string) {
    this.mailApiService.sendRequestMailToDriver(email,this.publicChildName)
    .subscribe({
      next:(mailRes)=>{
        console.log('email response',mailRes);
      },
      error:(error)=>{
      }
    })
  }
}
