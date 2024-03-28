import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DestinationDto } from '../types/Destination';

@Injectable({
  providedIn: 'root'
})
export class DestinationApiService {
  baseURL: string = `http://localhost:3000/`
  constructor(private http :HttpClient) { }

  addDestination(destination: DestinationDto):Observable<Object>{
    const headers = {'content-type': 'application/json'}
    const body =JSON.stringify(destination);
    return this.http.post(this.baseURL + 'destination',body,{'headers':headers})
}
}
