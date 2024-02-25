import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChildModel } from '../types/Child';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChildApiService {
  baseURL: string = `http://localhost:3000/`
  constructor(private http :HttpClient) { }

  addChild(child: ChildModel):Observable<any>{
      const headers = {'content-type': 'application/json'}
      const body =JSON.stringify(child);
      return this.http.post(this.baseURL + 'children',body,{'headers':headers})
  }
}
