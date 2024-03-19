import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DriverDto } from '../types/Auth';
import { AcceptRequestDto } from '../types/Request';

@Injectable({
  providedIn: 'root'
})
export class DriverApiService {

  baseURL: string = `http://localhost:3000/`
  constructor(private http:HttpClient) { }

  addDriver(driver: DriverDto): Observable<any>{
      const headers = {'content-type': 'application/json'}
      const body =JSON.stringify(driver);
      return this.http.post(this.baseURL + 'driver',body,{'headers':headers})
    }

  getLoggedInDriverRole(id: any):Observable<any>{
      const url = this.baseURL+`driver/${id}`
      return this.http.get<any>(url)
    }

  getRequestsForDriver(driverID:string):Observable<any>{
    const url = this.baseURL+`driver/transport-request/${driverID}`
    return this.http.get<any>(url)
  }

  acceptRequests(acceptDto:AcceptRequestDto):Observable<any>{
    const headers = {'content-type': 'application/json'}
    const body =JSON.stringify(acceptDto);
    const url = this.baseURL+`driver/accept-request/${acceptDto.childId}/${acceptDto.driverId}`
    return this.http.post(url,body,{'headers':headers})
  }

}
