import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { EmployeeServeiceService } from '../employee.serveice';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup = new FormGroup({});

  constructor(
    private employeeService: EmployeeServeiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^0\d{9}$/)]],
      gender: ['', Validators.required],
      EmpAge: [
        '',
        [Validators.required, Validators.min(18), Validators.max(65)],
      ],
      isMarried: [null, Validators.required],
      isActive: [null, Validators.required],
      dateOfJoining: ['', Validators.required],
      desId: [null, Validators.required],
    });

    let id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.employeeService.getEmployee(id).subscribe({
        next: (res: any) => {
          if (res.dateOfJoining) {
            res.dateOfJoining = this.formatDate(res.dateOfJoining);
            res.EmpAge = res.empAge;
            
            this.employeeForm.patchValue(res);
            this.employeeForm.addControl('empId', this.fb.control(res.empId));
            
          }
        },
        error: (error: any) => {
          console.log('Error in getting employee', error);
        },
      });
    }
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe((res: any) => {
      this.employeeService.originalEmployees = res;
    });
  }

  getEmployee() {
    let id = this.activatedRoute.snapshot.params['id'];
    console.log("id", id)
    if (id) {
      this.employeeService.getEmployee(id).subscribe((res: any) => {
        this.employeeForm.patchValue(res);
      });
    }
  }

  deleteEmployee() {
    let id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.employeeService.deleteEmployee(id).subscribe((res: any) => {
        this.router.navigate(['/employee']);
      });
    }
  }

  onSubmit() {
    console.log(this.employeeForm.value);
    console.log("empId", this.employeeForm.value.empId)
    console.log("Form is valid", this.employeeForm.valid)
    try{
    if (!this.employeeForm.valid) {
      console.log('Form is valid');
      if (!this.employeeForm.value.empId) {
        this.employeeService
          .addEmployee(this.employeeForm.value)
          .subscribe((res: any) => {
            this.router.navigate(['/employees']);
            this.employeeForm.reset();
          });
      } else {
        console.log('Form is not valid');
        this.employeeService
          .updateEmployee(this.employeeForm.value)
          .subscribe((res: any) => {
            this.employeeForm.reset();
            this.router.navigate(['/employees']);
          });
      }
    }
  }catch(error:any){
    console.log('Error in submitting form', error);
  }
  }
}
