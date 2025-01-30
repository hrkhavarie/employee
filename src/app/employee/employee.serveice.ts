import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = environment.apiUrl;

  originalEmployees: Employee[] = [];

  constructor(private http: HttpClient) { }

  // Get all employees
  getEmployees(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/Employee`);
  }

  // Get employee by id
  getEmployee(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/Employee/${id}`);
  }

  // Create employee
  createEmployee(employee: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/Employee`, employee);
  }

  // Update employee
  updateEmployee(id: number, employee: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/Employee/${id}`, employee);
  }

  // Delete employee
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/Employee/${id}`);
  }
}
