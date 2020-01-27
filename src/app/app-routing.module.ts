import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './core/auth/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'bills',
    loadChildren: () => import('./bills/bills.module').then(m => m.BillsModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'people',
    loadChildren: () =>
      import('./people/people.module').then(m => m.PeopleModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'billing',
    loadChildren: () =>
      import('./billing/billing.module').then(m => m.BillingModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'accounts',
    loadChildren: () =>
      import('./accounts/accounts.module').then(m => m.AccountsModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'receipt',
    loadChildren: () => import('./receipt/receipt.module').then(m => m.ReceiptModule)
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
