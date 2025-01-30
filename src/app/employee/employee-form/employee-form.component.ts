import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.serveice';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee, Gender } from '../../models/employee.model';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm!: FormGroup;
  isEditMode = false;
  employeeId?: number;
  Gender = Gender;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.employeeForm = this.formBuilder.group({
      firstName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[a-zA-Z\s]*$/)  // Only letters and spaces
      ]],
      lastName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[a-zA-Z\s]*$/)  // Only letters and spaces
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)  // Stricter email validation
      ]],
      phone: ['', [
        Validators.required,
        Validators.pattern(/^0\d{9}$/)  // Starts with 0 followed by 9 digits
      ]],
      gender: ['', Validators.required],
      empAge: ['', [
        Validators.required,
        Validators.min(18),
        Validators.max(65),
        Validators.pattern(/^\d+$/)  // Only numbers
      ]],
      dateOfJoining: ['', Validators.required],
      isMarried: [false],
      isActive: [true]
    });

    // Subscribe to form changes for real-time validation
    this.employeeForm.valueChanges.subscribe(() => {
      this.errorMessage = '';  // Clear API error when form changes
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.employeeId = +params['id'];
        this.loadEmployee(this.employeeId);
      }
    });
  }

  loadEmployee(id: number): void {
    this.employeeService.getEmployee(id).subscribe({
      next: (employee: Employee) => {
        // Convert the date to the format expected by the date input
        const formattedEmployee = {
          ...employee,
          dateOfJoining: employee.dateOfJoining ? this.formatDateForInput(employee.dateOfJoining) : ''
        };
        this.employeeForm.patchValue(formattedEmployee);
      },
      error: (error: string) => {
        this.errorMessage = error;
        console.error('Error loading employee:', error);
      }
    });
  }

  private formatDateForInput(date: string | Date): string {
    const d = new Date(date);
    // Ensure the date is valid
    if (isNaN(d.getTime())) {
      return '';
    }
    // Format as YYYY-MM-DD
    return d.toISOString().split('T')[0];
  }

  onSubmit(): void {
    if (this.employeeForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.errorMessage = '';
      
      const formValue = this.employeeForm.value;
      
      // Format the data for the API with exact property names expected by backend
      const employeeData = {
        FirstName: formValue.firstName,
        LastName: formValue.lastName,
        Email: formValue.email,
        Phone: formValue.phone,
        Gender: Number(formValue.gender),
        EmpAge: Number(formValue.empAge),
        DateOfJoining: formValue.dateOfJoining ? new Date(formValue.dateOfJoining).toISOString() : new Date().toISOString(),
        IsMarried: Boolean(formValue.isMarried),
        IsActive: Boolean(formValue.isActive)
      };

      console.log('Raw form value:', formValue);
      console.log('Formatted request data:', employeeData);

      if (this.isEditMode && this.employeeId) {
        this.employeeService.updateEmployee(this.employeeId, employeeData).subscribe({
          next: (response) => {
            console.log('Update response:', response);
            this.router.navigate(['/employees']);
          },
          error: (error: string) => {
            this.isSubmitting = false;
            this.errorMessage = error;
            console.error('Error updating employee:', error);
          }
        });
      } else {
        this.employeeService.createEmployee(employeeData).subscribe({
          next: (response) => {
            console.log('Create response:', response);
            this.router.navigate(['/employees']);
          },
          error: (error: string) => {
            this.isSubmitting = false;
            this.errorMessage = error;
            console.error('Error creating employee:', error);
          }
        });
      }
    } else {
      Object.keys(this.employeeForm.controls).forEach(key => {
        const control = this.employeeForm.get(key);
        control?.markAsTouched();
        if (control?.errors) {
          console.log(`Validation errors for ${key}:`, control.errors);
        }
      });
    }
  }

  // Helper method to check if a field has errors
  hasError(fieldName: string, errorType: string): boolean {
    const control = this.employeeForm.get(fieldName);
    return control?.touched && control?.hasError(errorType) || false;
  }

  // Helper method to get all errors for a field
  getFieldErrors(fieldName: string): string[] {
    const control = this.employeeForm.get(fieldName);
    if (control?.touched && control?.errors) {
      const errors: string[] = [];
      if (control.errors['required']) errors.push(`${fieldName} is required`);
      if (control.errors['minlength']) errors.push(`${fieldName} must be at least ${control.errors['minlength'].requiredLength} characters`);
      if (control.errors['email']) errors.push('Invalid email format');
      if (control.errors['pattern']) {
        switch (fieldName) {
          case 'email':
            errors.push('Invalid email format');
            break;
          case 'phone':
            errors.push('Phone must start with 0 followed by 9 digits');
            break;
          case 'firstName':
          case 'lastName':
            errors.push('Only letters and spaces are allowed');
            break;
          case 'empAge':
            errors.push('Age must be a valid number');
            break;
        }
      }
      if (control.errors['min']) errors.push(`Minimum ${fieldName} is ${control.errors['min'].min}`);
      if (control.errors['max']) errors.push(`Maximum ${fieldName} is ${control.errors['max'].max}`);
      return errors;
    }
    return [];
  }
}
