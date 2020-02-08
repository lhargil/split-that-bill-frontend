import { NgModule } from '@angular/core';

import { BillingRoutingModule } from './billing-routing.module';
import { BillingComponent } from './billing.component';
import { BillingListComponent } from './billing-list/billing-list.component';
import { BillingPaymentComponent } from './billing-payment/billing-payment.component';
import { SharedModule } from '../shared/shared.module';
import { WizardModule } from '../wizard/wizard.module';
import { PersonEditorShellComponent } from './person-editor-shell/person-editor-shell.component';
import { FormsModule } from '../forms/forms.module';
import { BillEditorShellComponent } from './bill-editor-shell/bill-editor-shell.component';
import { BillItemsEditorShellComponent } from './bill-items-editor-shell/bill-items-editor-shell.component';
import { FriendsEditorShellComponent } from './friends-editor-shell/friends-editor-shell.component';
import { BillItemsAssignEditorShellComponent } from './bill-items-assign-editor-shell/bill-items-assign-editor-shell.component';
import { ExtraChargeEditorShellComponent } from './extra-charge-editor-shell/extra-charge-editor-shell.component';
import { ReceiptShellComponent } from './receipt-shell/receipt-shell.component';
import { StepTrackerModule } from '../step-tracker/step-tracker.module';
import { ExtraChargesShellComponent } from './extra-charges-shell/extra-charges-shell.component';


@NgModule({
  declarations: [
    BillingComponent,
    BillingListComponent,
    BillingPaymentComponent,
    PersonEditorShellComponent,
    BillEditorShellComponent,
    BillItemsEditorShellComponent,
    FriendsEditorShellComponent,
    BillItemsAssignEditorShellComponent,
    ExtraChargeEditorShellComponent,
    ReceiptShellComponent,
    ExtraChargesShellComponent,],
  imports: [
    SharedModule,
    BillingRoutingModule,
    WizardModule,
    FormsModule,
    StepTrackerModule
  ],
  entryComponents: [
    PersonEditorShellComponent,
    BillEditorShellComponent,
    BillItemsEditorShellComponent,
    FriendsEditorShellComponent,
    BillItemsAssignEditorShellComponent,
    ExtraChargeEditorShellComponent,
    ReceiptShellComponent,
    ExtraChargesShellComponent,
  ]
})
export class BillingModule { }
