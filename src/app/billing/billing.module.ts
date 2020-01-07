import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillingRoutingModule } from './billing-routing.module';
import { BillingComponent } from './billing.component';
import { BillingListComponent } from './billing-list/billing-list.component';
import { BillingPaymentComponent } from './billing-payment/billing-payment.component';
import { SharedModule } from '../shared/shared.module';
import { WizardModule } from '../wizard/wizard.module';


@NgModule({
  declarations: [BillingComponent, BillingListComponent, BillingPaymentComponent],
  imports: [
    SharedModule,
    WizardModule,
    BillingRoutingModule
  ]
})
export class BillingModule { }
