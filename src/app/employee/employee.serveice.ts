import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServeiceService {
  private apiUrl = 'https://localhost:7098/api/Employee';

  originalEmployees: Employee[] = [];


  constructor(
    private http: HttpClient,
    
  ) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  getEmployee(id: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/${id}`);
  }

  addEmployee(employee: Employee): Observable<Employee> {

    return this.http.post<Employee>(`${this.apiUrl}`, employee);

  }

  updateEmployee(employee: Employee): Observable<Employee> {
    console.log('Employee ID', employee.empId);
    return this.http.put<Employee>(`${this.apiUrl}/${employee.empId}`, employee);
  }

  deleteEmployee(id: number): Observable<Employee> {
    return this.http.delete<Employee>(`${this.apiUrl}/${id}`);
  }


}
