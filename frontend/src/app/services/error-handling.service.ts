import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {
  baseURL: string = `http://localhost:3000/`
  constructor(private http: HttpClient) { }

  checkIfEmailExists(email:string){
    let params = new HttpParams();
    params = params.set('email', email);
    const url = this.baseURL+`user/exists`
    return this.http.get<any>(url,{params})
  }
}