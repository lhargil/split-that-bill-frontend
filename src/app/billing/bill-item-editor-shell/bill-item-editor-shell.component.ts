import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { decimalAmountValidator } from 'src/app/shared/validators/decimal-amount.validator';

@Component({
  selector: 'app-bill-item-editor-shell',
  templateUrl: './bill-item-editor-shell.component.html',
  styles: []
})
export class BillItemEditorShellComponent implements OnInit {
  @Input() formData: any;
  billItemForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.billItemForm = this.formBuilder.group({
      id: [''],
      description: ['', [Validators.required, Validators.minLength]],
      amount: [Number(0).toFixed(2), [Validators.required, Validators.min(0.01), decimalAmountValidator()]],
      discount: ['', [decimalAmountValidator(true)]]
    });
  }
  ngOnInit() {
    this.billItemForm.patchValue(this.formData);
  }
  formSubmit(onFormSubmitted: (data) => void) {
    this.billItemForm.markAllAsTouched();

    if (this.billItemForm.invalid) {
      return;
    }

    const updatedBillItem = { ...this.billItemForm.value };
    onFormSubmitted(updatedBillItem);
  }
}
