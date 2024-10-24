import { Component, OnInit } from '@angular/core';
import { Employee, Gender } from 'src/app/models/employee.model';
import { EmployeeServeiceService } from '../employee.serveice';
import { Router } from '@angular/router';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  Gender = Gender;
  selectedAll: boolean = false;

  constructor(
    private employeeService: EmployeeServeiceService,
    private router: Router

  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }
  selected: Employee | undefined;
  selectEmployee(employee: Employee): number | undefined {
    if (employee.selected) {
      this.selected = employee;
      console.log('Employee ID', employee.empId);
      return employee.empId;
    } else {
      console.log('Employee ID is not defined');
      return undefined;
    }
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (employees: Employee[]) => {
        this.employees = employees.sort((a, b) => b.empId - a.empId);
        console.log('Employees', employees);
      },
      error: (error: any) => {
        console.log('Error in getting employees', error);
      },
    });
  }

 

  deleteEmployee(id: number): void {
    if (id !== null) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          this.getEmployees();
        },
        error: (err) => {
          console.error('Error deleting employee:', err);
        }
      });
    }
  }

  isAnyEmployeeSelected(): boolean {
    return this.employees.some((e) => e.selected);
  }

  toggleAllEmployees() {
    this.employees.forEach((e) => (e.selected = this.selectedAll));
  }
 
  navigateToEdit(id: number) {
    this.router.navigate([`/employee/edit/${id}`]);
  }

  getGenderLabel(gender: Gender): string {
    switch (gender) {
      case Gender.Male:
        return 'Male';
      case Gender.Female: 
        return 'Female';
      default:
        return 'Other';
    }
  }
}
