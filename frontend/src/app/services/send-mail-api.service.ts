import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SendMailApiService {
  baseURL: string = `http://localhost:3000/`

  constructor(private http :HttpClient) { }

  sendRequestMailToDriver(driver_mail:string,child_name:string){
    const headers = {'content-type': 'application/json'}
    return this.http.post(this.baseURL + `parents/sendmail/${driver_mail}/${child_name}`,{'headers':headers})
  }

  sendAcceptMailToParent(parent_mail:string,child_name:string){
    const headers = {'content-type': 'application/json'}
    return this.http.post(this.baseURL + `driver/sendmail/${parent_mail}/${child_name}`,{'headers':headers})
  }
}
