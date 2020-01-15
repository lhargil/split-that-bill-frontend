import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'bill-items-form[billItemsForm]',
  templateUrl: './bill-items-form.component.html',
  styleUrls: ['./bill-items-form.component.scss']
})
export class BillItemsFormComponent implements OnInit {
  @Input() billItemsForm: FormGroup;

  get billItems() {
    return this.billItemsForm.get('billItems') as FormArray;
  }
  constructor() {
  }

  ngOnInit() {
  }

  addBillItem() { }
  removeBillItem(index: number) { }
}
