import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChildDto, ChildModel } from '../types/Child';
import { BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChildApiService {
  baseURL: string = `http://localhost:3000/`

  users$:BehaviorSubject<object[]> = new BehaviorSubject<object[]>([])

  constructor(private http :HttpClient) { }

  addChild(child: ChildModel):Observable<any>{
      const headers = {'content-type': 'application/json'}
      const body =JSON.stringify(child);
      return this.http.post(this.baseURL + 'children',body,{'headers':headers})
  }

  getChildrenByParentID(parentID: string):Observable<any>{
    const url = this.baseURL+`children/parent/${parentID}`
    return this.http.get<any>(url)
  }
  deleteChild(id: any):Observable<ChildModel>{
    const url = this.baseURL+`children/${id}`
    return this.http.delete<ChildModel>(url)
  }

  getChildById(id: any):Observable<ChildDto>{
    const url = this.baseURL+`children/${id}`
    return this.http.get<ChildDto>(url)
  }

  updateChild(id:string, childModel:ChildModel):Observable<any>{
    const url = this.baseURL+`children/${id}`
    return this.http.put<any>(url,childModel)
  }
  
}
