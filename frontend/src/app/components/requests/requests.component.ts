import { Component, OnInit } from '@angular/core';
import { SessionHelper } from '../../helpers/sessionStorage.helper';
import { DriverApiService } from '../../services/driver-api.service';
import { AcceptRequestDto } from '../../types/Request';
import { SendMailApiService } from '../../services/send-mail-api.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.css',
})
export class RequestsComponent implements OnInit {
  finalUuid: any;
  public requestDetails$: any[] = [];
  AcceptModel: AcceptRequestDto = {
    childId: '',
    driverId: '',
  };
  constructor(
    private sessionHelper: SessionHelper,
    private driverApiService: DriverApiService,
    private mailApiService:SendMailApiService
  ) {}

  ngOnInit(): void {
    this.finalUuid = this.sessionHelper.getItem('currentUser');
    this.getRequestsForDriverByID(this.finalUuid);
  }

  getRequestsForDriverByID(driverID: string): void {
    this.driverApiService.getRequestsForDriver(driverID).subscribe((data) => {
      this.requestDetails$ = data.requests;
      console.log(this.requestDetails$);
    });
  }

  acceptRequest(childId: any) {
    this.AcceptModel.childId = childId;
    this.AcceptModel.driverId = this.sessionHelper.getItem(
      'currentUser'
    ) as string;
    console.log(this.AcceptModel.childId);
    console.log(this.AcceptModel.driverId);

    this.driverApiService.acceptRequests(this.AcceptModel).subscribe({
      next: (data) => {
        console.log(data);
      },
    });
  }

  sendAcceptMailToParent(email: string, child_name:string) {
    this.mailApiService
      .sendAcceptMailToParent(email,child_name)
      .subscribe({
        next: (mailRes) => {
          console.log('email response', mailRes);
        },
        error: (error) => {},
      });
  }
}
