import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChildModel } from '../types/Child';
import { BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChildApiService {
  baseURL: string = `http://localhost:3000/`
  apiUrl: string = 'https://jsonplaceholder.typicode.com/users'
  users$:BehaviorSubject<object[]> = new BehaviorSubject<object[]>([])

  constructor(private http :HttpClient) { }

  addChild(child: ChildModel):Observable<any>{
      const headers = {'content-type': 'application/json'}
      const body =JSON.stringify(child);
      return this.http.post(this.baseURL + 'children',body,{'headers':headers})
  }

  getChildrenByParentID(parentID: string):Observable<any>{
    const url = this.baseURL+`children/${parentID}`
    return this.http.get<any>(url)
  }
  
  getUsers(){ return this.http.get<any[]>(this.apiUrl)}
}
