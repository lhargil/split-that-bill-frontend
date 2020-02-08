import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { decimalAmountValidator } from 'src/app/shared/validators/decimal-amount.validator';

@Component({
  selector: 'app-extra-charge-editor-shell',
  templateUrl: './extra-charge-editor-shell.component.html',
  styles: []
})
export class ExtraChargeEditorShellComponent implements OnInit {
  @Input() formData: any;
  extraChargeForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.extraChargeForm = this.formBuilder.group({
      id: [''],
      description: ['', [Validators.required, Validators.minLength]],
      amount: [Number(0).toFixed(2), [Validators.required, Validators.min(0.01), decimalAmountValidator()]]
    });
  }
  ngOnInit() {
    this.extraChargeForm.patchValue(this.formData);
  }

  formSubmit(callback: (data) => void) {
    this.extraChargeForm.markAllAsTouched();
    if (this.extraChargeForm.invalid) {
      return;
    }

    const updatedExtraCharge = { ...this.extraChargeForm.value };
    console.log(updatedExtraCharge);
    callback(updatedExtraCharge);
  }
}
