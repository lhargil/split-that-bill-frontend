import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillingRoutingModule } from './billing-routing.module';
import { BillingComponent } from './billing.component';
import { BillingListComponent } from './billing-list/billing-list.component';
import { BillingPaymentComponent } from './billing-payment/billing-payment.component';
import { SharedModule } from '../shared/shared.module';
import { WizardModule } from '../wizard/wizard.module';
import { PersonEditorShellComponent } from './person-editor-shell/person-editor-shell.component';
import { FormsModule } from '../forms/forms.module';
import { PeopleEditorShellComponent } from './people-editor-shell/people-editor-shell.component';
import { BillEditorShellComponent } from './bill-editor-shell/bill-editor-shell.component';
import { BillItemsEditorShellComponent } from './bill-items-editor-shell/bill-items-editor-shell.component';
import { FriendsEditorShellComponent } from './friends-editor-shell/friends-editor-shell.component';
import { BillItemsAssignEditorShellComponent } from './bill-items-assign-editor-shell/bill-items-assign-editor-shell.component';
import { ExtraChargesEditorShellComponent } from './extra-charges-editor-shell/extra-charges-editor-shell.component';
import { ReceiptShellComponent } from './receipt-shell/receipt-shell.component';
import { StepTrackerModule } from '../step-tracker/step-tracker.module';
import { PageHeaderModule } from '../page-header/page-header.module';


@NgModule({
  declarations: [
    BillingComponent,
    BillingListComponent,
    BillingPaymentComponent,
    PersonEditorShellComponent,
    PeopleEditorShellComponent,
    BillEditorShellComponent,
    BillItemsEditorShellComponent,
    FriendsEditorShellComponent,
    BillItemsAssignEditorShellComponent,
    ExtraChargesEditorShellComponent,
    ReceiptShellComponent,],
  imports: [
    SharedModule,
    BillingRoutingModule,
    WizardModule,
    FormsModule,
    StepTrackerModule,
    PageHeaderModule
  ],
  entryComponents: [
    PersonEditorShellComponent,
    PeopleEditorShellComponent,
    BillEditorShellComponent,
    BillItemsEditorShellComponent,
    FriendsEditorShellComponent,
    BillItemsAssignEditorShellComponent,
    ExtraChargesEditorShellComponent,
    ReceiptShellComponent,
  ]
})
export class BillingModule { }
