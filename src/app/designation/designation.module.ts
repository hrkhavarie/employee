import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignationListComponent } from './designation-list/designation-list.component';
import { DesgiantionFormComponent } from './desgiantion-form/desgiantion-form.component';



@NgModule({
  declarations: [
    DesignationListComponent,
    DesgiantionFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DesignationModule { }
