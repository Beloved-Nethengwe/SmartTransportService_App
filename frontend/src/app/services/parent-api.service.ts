import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../types/Auth';


@Injectable({
  providedIn: 'root'
})
export class ParentApiService {

  baseURL: string = `http://localhost:3000/`
  constructor(private http:HttpClient) { }

  addParent(parent: User): Observable<any>{
      const headers = {'content-type': 'application/json'}
      const body =JSON.stringify(parent);
      return this.http.post(this.baseURL + 'parents',body,{'headers':headers})
    }

    getLoggedInParentRole(id: any):Observable<any>{
      const url = this.baseURL+`parents/${id}`
      return this.http.get<any>(url)
    }
  }
