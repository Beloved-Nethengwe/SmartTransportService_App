import { Component, OnInit } from '@angular/core';
import { SessionHelper } from '../../helpers/sessionStorage.helper';
import { DriverApiService } from '../../services/driver-api.service';
import { ChildDto } from '../../types/Child';

@Component({
  selector: 'app-commuter',
  templateUrl: './commuter.component.html',
  styleUrl: './commuter.component.css',
})
export class CommuterComponent implements OnInit {
  userId: any;
  
  public commutersDetails$: ChildDto[] = [];
  
  commuters: ChildDto = {
    Name: '',
    Surname: '',
    Allergy: '',
    CellphoneNumber: '',
    PickUp: '',
    Destination: '',
  };
  constructor(
    private driverService : DriverApiService,
    private sessionHelper: SessionHelper,

  ) {}

  ngOnInit(): void {
    this.userId = this.sessionHelper.getItem('currentUser');
    this.getCommuters(this.userId);
  }

  getCommuters(driverId: string) {
    this.driverService.getCommuters(driverId).subscribe({
      next: (res) => {
        this.commutersDetails$ = res.commuters;
      },
      error: (error) => {
        throw error
      },
    });
  }
}
