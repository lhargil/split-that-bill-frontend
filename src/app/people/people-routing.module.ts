import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PeopleComponent } from './people.component';
import { PeopleListComponent } from './people-list/people-list.component';
import { PersonBillItemsComponent } from './person-bill-items/person-bill-items.component';

const routes: Routes = [{ path: '', component: PeopleComponent, children: [
  {
    path: '', 
    component: PeopleListComponent,
  },
  {
    path: ':id/items',
    component: PersonBillItemsComponent
  }
] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeopleRoutingModule { }
