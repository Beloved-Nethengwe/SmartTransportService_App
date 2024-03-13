import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';
import { DriverDto } from '../types/Auth';

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

}
