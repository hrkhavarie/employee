import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';
import { Employee } from '../models/employee.model';

// Interface to match backend property names
interface EmployeeDTO {
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  Gender: number;
  EmpAge: number;
  DateOfJoining: string;
  IsMarried: boolean;
  IsActive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = environment.apiUrl;

  originalEmployees: Employee[] = [];

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      if (error.status === 0) {
        errorMessage = 'Unable to connect to the server. Please make sure your API is running.';
      } else if (error.error?.errors) {
        // Handle validation errors
        const errors = error.error.errors as Record<string, string[]>;
        errorMessage = Object.entries(errors)
          .map(([_, messages]) => messages.join(', '))
          .join('\n');
      } else {
        errorMessage = `Server returned code: ${error.status}, error message: ${error.message}`;
      }
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }

  // Get all employees
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/api/Employee`)
      .pipe(catchError(this.handleError));
  }

  // Get employee by id
  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/api/Employee/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Create employee
  createEmployee(data: EmployeeDTO): Observable<Employee> {
    return this.http.post<Employee>(`${this.baseUrl}/api/Employee`, data)
      .pipe(catchError(this.handleError));
  }

  // Update employee
  updateEmployee(id: number, data: EmployeeDTO): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseUrl}/api/Employee/${id}`, data)
      .pipe(catchError(this.handleError));
  }

  // Delete employee
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/Employee/${id}`)
      .pipe(catchError(this.handleError));
  }
}
