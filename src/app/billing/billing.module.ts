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


@NgModule({
  declarations: [BillingComponent, BillingListComponent, BillingPaymentComponent, PersonEditorShellComponent],
  imports: [
    SharedModule,
    BillingRoutingModule,
    WizardModule,
    FormsModule
  ],
  entryComponents: [
    PersonEditorShellComponent,
  ]
})
export class BillingModule { }
