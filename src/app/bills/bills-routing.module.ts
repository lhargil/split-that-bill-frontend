import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillsComponent } from './bills.component';
import { BillsListComponent } from './bills-list/bills-list.component';
import { BillsViewComponent } from './bills-view/bills-view.component';
import { BillsEditorComponent } from './bills-editor/bills-editor.component';

const routes: Routes = [
  { path: '', component: BillsComponent, children: [
      {
        path: '',
        component: BillsListComponent
      },
      {
        path: ':id/receipt',
        component: BillsViewComponent
      },
      {
        path: ':id/edit',
        component: BillsEditorComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillsRoutingModule { }
