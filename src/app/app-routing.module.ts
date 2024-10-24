import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { DesignationListComponent } from './designation/designation-list/designation-list.component';
import { HomeComponent } from './home/home.component';
import { EmployeeFormComponent } from './employee/employee-form/employee-form.component';
import { DesgiantionFormComponent } from './designation/desgiantion-form/desgiantion-form.component';

const routes: Routes = [
  { path: '',component: HomeComponent },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'employee/add', component: EmployeeFormComponent },
  { path: 'employee/edit/:id', component: EmployeeFormComponent },
  { path: 'employee/delete/:id', component: EmployeeListComponent },
  // { path: 'employee/:id', component: EmployeeFormComponent },
  { path: 'designations', component: DesignationListComponent },
  { path: 'designation/add', component: DesignationListComponent },
  { path: 'designation/:id', component: DesgiantionFormComponent },
  { path: 'list ', component: EmployeeListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
