import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillsRoutingModule } from './bills-routing.module';
import { BillsComponent } from './bills.component';
import { BillsListComponent } from './bills-list/bills-list.component';
import { BillsViewComponent } from './bills-view/bills-view.component';
import { BillsEditorComponent } from './bills-editor/bills-editor.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [BillsComponent, BillsListComponent, BillsViewComponent, BillsEditorComponent],
  imports: [
    SharedModule,
    BillsRoutingModule
  ]
})
export class BillsModule { }
