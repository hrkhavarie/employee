import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    // EmployeeFormComponent,
    // EmployeeListComponent
  ],
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EmployeeModule { }
