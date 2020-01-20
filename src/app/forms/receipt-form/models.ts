import { BillingData } from 'src/app/billing/billing';

export
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
      totalWithCharges: Receipt.createMoney(this.getTotalWithCharges()),
      totalChargeRates: this.getTotalChargeRates()
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
    return new Date(date.year, date.month, date.day).toDateString();
  }

  private getTotal() {
    return Receipt.createMoney(this.billingData.billItems.reduce((acc, curr) => {
      return acc + Number(curr.amount);
    }, 0));
  }

  private getTotalWithCharges() {
    return this.getTotal().amount + (this.getTotal().amount * this.getTotalChargeRates());
  }

  private getTotalChargeRates() {
    return this.billingData.extraCharges.reduce((acc, curr) => {
      return acc + Number(curr.rate);
    }, 0) / 100;
  }
}
