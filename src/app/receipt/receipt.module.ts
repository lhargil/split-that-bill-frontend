import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceiptRoutingModule } from './receipt-routing.module';
import { ReceiptComponent } from './receipt.component';
import { PageHeaderModule } from '../page-header/page-header.module';
import { FormsModule } from '../forms/forms.module';


@NgModule({
  declarations: [ReceiptComponent],
  imports: [
    CommonModule,
    ReceiptRoutingModule,
    PageHeaderModule,
    FormsModule
  ]
})
export class ReceiptModule { }
