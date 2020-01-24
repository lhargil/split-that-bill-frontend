import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { BillingData } from 'src/app/billing/billing';
import { Receipt } from "src/app/billing/models/receipt";

@Component({
  selector: 'receipt-form[receiptData]',
  templateUrl: './receipt-form.component.html',
  styleUrls: ['./receipt-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReceiptFormComponent implements OnInit {
  @Input()
  set receiptData(value: BillingData) {
    this.receipt = Receipt.create(value);
  }

  receipt: Receipt;

  constructor() { }

  ngOnInit() {
  }

  trackByFn(index, personBillItem) {
    return personBillItem.key;
  }
}
