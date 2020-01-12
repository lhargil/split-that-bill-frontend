import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonFormComponent } from './person-form/person-form.component';
import { SharedModule } from '../shared/shared.module';
import { PeopleFormComponent } from './people-form/people-form.component';
import { BillFormComponent } from './bill-form/bill-form.component';
import { BillItemsFormComponent } from './bill-items-form/bill-items-form.component';



@NgModule({
  declarations: [PersonFormComponent, PeopleFormComponent, BillFormComponent, BillItemsFormComponent],
  imports: [
    SharedModule
  ],
  exports: [PersonFormComponent, PeopleFormComponent, BillFormComponent, BillItemsFormComponent]
})
export class FormsModule { }
