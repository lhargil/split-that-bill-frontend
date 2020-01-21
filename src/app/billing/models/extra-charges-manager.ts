import { ExtraCharge } from './interfaces';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { decimalAmountValidator } from 'src/app/shared/validators/decimal-amount.directive';
import { IdGenerator } from 'src/app/shared/utilities';

export class ExtraChargesManager {
  private _extraChargesForm: FormGroup;

  get extraChargesForm() {
    return this._extraChargesForm;
  }

  get extraCharges() {
    return this.extraChargesForm.get('extraCharges') as FormArray;
  }
  constructor(private formBuilder: FormBuilder, private extraChargesList: ExtraCharge[]) { }

  createForm() {
    this._extraChargesForm = this.formBuilder.group({
      extraCharges: this.formBuilder.array(this.extraChargesList.map(ec => {
        return this.buildExtraCharge(ec);
      })),
    });
  }

  addExtraCharge() {
    this.extraCharges.push(this.buildExtraCharge(this.createExtraCharge()));
  }

  removeExtraCharge(index: number) {
    this.extraCharges.removeAt(index);
  }

  populateList(list: ExtraCharge[]) {
    this.extraChargesList.splice(0);
    list.forEach(ec => this.extraChargesList.push(ec));
  }

  private createExtraCharge() {
    const id = IdGenerator.generate(-1, -100);
    return {
      id,
      description: '',
      amount: 0
    };
  }

  private buildExtraCharge(extraCharge: ExtraCharge) {
    return this.formBuilder.group({
      id: [extraCharge.id],
      description: [extraCharge.description, [Validators.required, Validators.minLength]],
      amount: [Number(extraCharge.amount).toFixed(2), [Validators.required, Validators.min(0.01), decimalAmountValidator()]]
    });
  }
}
