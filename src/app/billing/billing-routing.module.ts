import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillingComponent } from './billing.component';
import { BillingListComponent } from './billing-list/billing-list.component';
import { BillingPaymentComponent } from './billing-payment/billing-payment.component';

const routes: Routes = [{ path: '', component: BillingComponent, 
  children: [{
    path: '',
    component: BillingListComponent
  },{
    path: ':id/pay',
    component: BillingPaymentComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillingRoutingModule { }
