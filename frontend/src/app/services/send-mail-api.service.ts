import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendMailApiService {
  baseURL: string = `http://localhost:3000/`

  constructor(private http :HttpClient) { }

}
