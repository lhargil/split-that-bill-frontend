import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonFormComponent } from './person-form/person-form.component';
import { SharedModule } from '../shared/shared.module';
import { PeopleFormComponent } from './people-form/people-form.component';
import { BillFormComponent } from './bill-form/bill-form.component';
import { BillItemsFormComponent } from './bill-items-form/bill-items-form.component';
import { FriendsFormComponent } from './friends-form/friends-form.component';
import { BillItemsAssignFormComponent } from './bill-items-assign-form/bill-items-assign-form.component';
import { ExtraChargesFormComponent } from './extra-charges-form/extra-charges-form.component';
import { ReceiptFormComponent } from './receipt-form/receipt-form.component';



@NgModule({
  declarations: [PersonFormComponent, PeopleFormComponent, BillFormComponent, BillItemsFormComponent, FriendsFormComponent, BillItemsAssignFormComponent, ExtraChargesFormComponent, ReceiptFormComponent],
  imports: [
    SharedModule
  ],
  exports: [PersonFormComponent, PeopleFormComponent, BillFormComponent, BillItemsFormComponent, FriendsFormComponent, BillItemsAssignFormComponent, ExtraChargesFormComponent, ReceiptFormComponent]
})
export class FormsModule { }
