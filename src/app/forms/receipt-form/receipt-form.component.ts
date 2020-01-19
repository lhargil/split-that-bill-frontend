import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { BillingData } from 'src/app/billing/billing';

class Receipt {
  static createMoney(amount: number) {
    return { amount, currency: 'MYR' };
  }
  constructor(private billingData: BillingData) { }

  get billInfo() {
    return {
      placeName: this.billingData.bill.establishmentName,
      remarks: this.billingData.bill.remarks,
      date: this.createDate({
        day: this.billingData.bill.billDateDay,
        month: this.billingData.bill.billDateMonth,
        year: this.billingData.bill.billDateYear
      }),
      total: this.getTotal(),
      totalCharges: this.getTotalChargeRates()
    };
  }

  get personBillItems() {
    return this.billingData.billItems.map(bi => {
      const assignee = this.billingData.personBillItems.find(pbi => pbi.itemId == bi.id);
      return {
        ...bi,
        price: Receipt.createMoney(bi.amount),
        priceWithCharges: Receipt.createMoney(Number(bi.amount) + (bi.amount * this.getTotalChargeRates())),
        assignedTo: this.billingData.friends.find(f => f.id == Number(assignee.assignee)) != null ?
          this.billingData.friends.find(f => f.id == Number(assignee.assignee)) : null
      };
    });
  }

  private createDate(date: { day: number, month: number, year: number }) {
    return new Date(date.year, date.month, date.day).toLocaleString();
  }

  private getTotal() {
    return Receipt.createMoney(this.billingData.billItems.reduce((acc, curr) => {
      return acc + curr.amount;
    }, 0));
  }

  private getTotalChargeRates() {
    return this.billingData.extraCharges.reduce((acc, curr) => {
      return acc + Number(curr.rate);
    }, 0) / 100;
  }
}

@Component({
  selector: 'receipt-form[receiptData]',
  templateUrl: './receipt-form.component.html',
  styleUrls: ['./receipt-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReceiptFormComponent implements OnInit {
  @Input()
  set receiptData(value: BillingData) {
    this.receipt = new Receipt(value);
  }

  receipt: Receipt;

  constructor() { }

  ngOnInit() {
  }

}
