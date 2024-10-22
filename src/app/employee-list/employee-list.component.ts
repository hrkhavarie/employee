import { Component, OnInit } from '@angular/core';
import { EmployeeServeiceService } from '../employee/employee.serveice.service';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent  implements OnInit{
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeServeiceService) {
  }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
    });
  }
}
