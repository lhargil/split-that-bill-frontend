import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceiptRoutingModule } from './receipt-routing.module';
import { ReceiptComponent } from './receipt.component';
import { FormsModule } from '../forms/forms.module';


@NgModule({
  declarations: [ReceiptComponent],
  imports: [
    CommonModule,
    ReceiptRoutingModule,
    FormsModule
  ]
})
export class ReceiptModule { }
