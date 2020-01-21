import { BillItem } from './interfaces';
import { IdGenerator } from 'src/app/shared/utilities';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { decimalAmountValidator } from 'src/app/shared/validators/decimal-amount.directive';

export class BillItemsManager {
  private _billItemsForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private billItemsList: BillItem[]) {
  }

  get billItemsForm() {
    return this._billItemsForm;
  }

  get billItems() {
    return this._billItemsForm.get('billItems') as FormArray;
  }

  getNewId() {
    const id = IdGenerator.generate(-1, -100);
    if (this.billItemsList.some(item => item.id == id)) {
      return this.getNewId();
    }
    return id;
  }

  createForm() {
    this._billItemsForm = this.formBuilder.group({
      billItems: this.formBuilder.array(this.billItemsList.map(item => {
        return this.buildBillItem(item);
      })),
    });
  }

  createBillItem() {
    const id = this.getNewId();
    return {
      id,
      description: '',
      amount: 0
    } as BillItem;
  }

  addBillItem(billItem: BillItem) {
    this.billItems.push(this.buildBillItem(billItem));
  }

  removeBillItem(index: number) {
    this.billItems.removeAt(index);
  }

  private buildBillItem(item) {
    return this.formBuilder.group({
      id: [item.id],
      description: [item.description, [Validators.required, Validators.minLength]],
      amount: [Number(item.amount).toFixed(2), [Validators.required, Validators.min(0.01), decimalAmountValidator()]],
      discount: [item.discount, [decimalAmountValidator(true)]]
    });
  }
}
