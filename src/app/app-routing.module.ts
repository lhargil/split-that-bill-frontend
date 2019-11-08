import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{ path: 'bills', loadChildren: () => import('./bills/bills.module').then(m => m.BillsModule) }, { path: 'people', loadChildren: () => import('./people/people.module').then(m => m.PeopleModule) }, { path: 'billing', loadChildren: () => import('./billing/billing.module').then(m => m.BillingModule) }, { path: 'accounts', loadChildren: () => import('./accounts/accounts.module').then(m => m.AccountsModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
