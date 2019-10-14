import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{ path: 'bills', loadChildren: () => import('./bills/bills.module').then(m => m.BillsModule) }, { path: 'people', loadChildren: () => import('./people/people.module').then(m => m.PeopleModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
