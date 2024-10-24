import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { DesignationListComponent } from './designation/designation-list/designation-list.component';
import { EmployeeFormComponent } from './employee/employee-form/employee-form.component';
@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeFormComponent,
    DesignationListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule , 
    HttpClientModule,
    FormsModule ,
    ReactiveFormsModule,
    RouterModule , 

  ],
  providers: [],
  bootstrap: [AppComponent ]
})
export class AppModule { }
