import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http:HttpClient) { }

  addEmployee(data :any): Observable<any> {
    return this._http.post('http://localhost:3000/employee', data);
  }
  updateEmployee(id: string,data :any): Observable<any> {
    return this._http.put(`http://localhost:3000/employee/${id}`, data);
  }
  getEmployeeList(): Observable<any[]> {
    return this._http.get<any[]>('http://localhost:3000/employee').pipe(
      map(data => data.sort((a, b) => b.experience - a.experience))
    );
  }
  deleteEmployee(id: any): Observable<any>{
    return this._http.delete(`http://localhost:3000/employee/${id}`);
  }
}
