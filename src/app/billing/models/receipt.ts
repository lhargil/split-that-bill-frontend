import { BillingData } from 'src/app/billing/billing';
export class Receipt {
  static createMoney(amount: number, currency: string) {
    return { amount, currency };
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
      totalWithCharges: Receipt.createMoney(this.getTotalWithCharges(), this.billingData.bill.currency),
      totalCharges: Receipt.createMoney(this.getTotalCharges(), this.billingData.bill.currency),
      totalChargeRates: this.getTotalChargeRates()
    };
  }
  get billItems() {
    return this.billingData.billItems.map(bi => {
      const personBillItem = this.billingData.personBillItems.find(pbi => pbi.itemId == bi.id);
      const discount = Number(bi.discount) / 100 || 0;
      const discountedAmount = bi.amount - (bi.amount * discount);

      return {
        ...bi,
        discount,
        price: Receipt.createMoney(bi.amount, this.billingData.bill.currency),
        priceWithCharges: Receipt.createMoney(discountedAmount +
          (discountedAmount * this.getTotalChargeRates()), this.billingData.bill.currency),
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
      const discount = Number(item.discount) / 100 || 0;
      const discountedAmount = Number(item.amount) - (Number(item.amount) * discount);
      const billItem = {
        ...item,
        discount,
        price: Receipt.createMoney(item.amount, this.billingData.bill.currency),
        priceWithCharges: Receipt.createMoney(discountedAmount +
          (discountedAmount * this.getTotalChargeRates()),
          this.billingData.bill.currency),
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
        totalPayable: Receipt.createMoney(result[key].billItems.reduce((acc, curr) => acc + curr.priceWithCharges.amount, 0),
          this.billingData.bill.currency)
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
      const discount = curr.discount || 0;
      const amount = Number(curr.amount);
      return acc + amount - (amount * discount / 100);
    }, 0), this.billingData.bill.currency);
  }
  private getTotalWithCharges() {
    return this.getTotal().amount + this.getTotalCharges();
  }
  private getTotalCharges() {
    return this.getTotal().amount * this.getTotalChargeRates();
  }
  private getTotalChargeRates() {
    return this.billingData.extraCharges.reduce((acc, curr) => {
      return acc + Number(curr.amount);
    }, 0) / 100;
  }
}
