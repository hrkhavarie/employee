import { Component, OnInit } from '@angular/core';
import { Employee, Gender } from '../../models/employee.model';
import { EmployeeService } from '../employee.serveice';
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
  selected: Employee | undefined;

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  selectEmployee(employee: Employee): void {
    if (employee.selected) {
      this.selected = employee;
      console.log('Employee ID', employee.empId);
    } else {
      this.selected = undefined;
      console.log('Employee deselected');
    }
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data: Employee[]) => {
        this.employees = data.sort((a: Employee, b: Employee) => 
          (b.empId ?? 0) - (a.empId ?? 0)
        );
        console.log('Employees', data);
      },
      error: (error: any) => {
        console.error('Error loading employees:', error);
      }
    });
  }

  deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          this.loadEmployees();
        },
        error: (error: any) => {
          console.error('Error deleting employee:', error);
        }
      });
    }
  }

  isAnyEmployeeSelected(): boolean {
    return this.employees.some((e) => e.selected);
  }

  toggleAllEmployees(): void {
    this.employees.forEach((e) => (e.selected = this.selectedAll));
  }

  navigateToEdit(id: number): void {
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
