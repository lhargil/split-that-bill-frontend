import { BillingData } from 'src/app/billing/billing';
export class Receipt {
  static createMoney(amount: number) {
    return { amount, currency: 'MYR' };
  }
  static create(billingData: BillingData) {
    return new Receipt(billingData);
  }
  private constructor(private billingData: BillingData) { }
  get billInfo() {
    return {
      placeName: this.billingData.bill.establishmentName,
      remarks: this.billingData.bill.remarks,
      date: this.createDate({
        day: this.billingData.bill.billDate.getDate(),
        month: this.billingData.bill.billDate.getMonth(),
        year: this.billingData.bill.billDate.getFullYear()
      }),
      total: this.getTotal(),
      totalWithCharges: Receipt.createMoney(this.getTotalWithCharges()),
      totalChargeRates: this.getTotalChargeRates()
    };
  }
  get billItems() {
    return this.billingData.billItems.map(bi => {
      const personBillItem = this.billingData.personBillItems.find(pbi => pbi.itemId == bi.id);
      return {
        ...bi,
        price: Receipt.createMoney(bi.amount),
        priceWithCharges: Receipt.createMoney(Number(bi.amount) + (bi.amount * this.getTotalChargeRates())),
        assignedTo: this.billingData.friends.find(f => f.id == Number(personBillItem && personBillItem.assignee || null)) != null ?
          this.billingData.friends.find(f => f.id == Number(personBillItem.assignee)) : null
      };
    });
  }
  get personBillItems() {
    const defaultPerson = {
      id: -100,
      firstname: 'not',
      lastname: 'assigned',
      fullname: 'not assigned'
    };
    const result = this.billingData.personBillItems.reduce((acc, curr) => {
      const item = this.billingData.billItems.find(bi => bi.id == curr.itemId);
      const billItem = {
        ...item,
        price: Receipt.createMoney(item.amount),
        priceWithCharges: Receipt.createMoney(Number(item.amount) + (item.amount * this.getTotalChargeRates())),
      };
      const person = this.billingData.friends.find(f => f.id == curr.assignee) || defaultPerson;

      if (acc.hasOwnProperty(person.id)) {
        acc[person.id].billItems.push(billItem);
      } else {
        acc[person.id] = {
          person,
          billItems: [billItem]
        };
      }

      return acc;

    }, {});

    return Object.keys(result).map(key => {
      return {
        key: result[key].person,
        value: result[key].billItems,
        totalPayable: Receipt.createMoney(result[key].billItems.reduce((acc, curr) => acc + curr.priceWithCharges.amount, 0))
      };
    });
  }
  private createDate(date: {
    day: number;
    month: number;
    year: number;
  }) {
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
      return acc + Number(curr.amount);
    }, 0) / 100;
  }
}
