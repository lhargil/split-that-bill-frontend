import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'bill-items-assign-form[personBillItems]',
  templateUrl: './bill-items-assign-form.component.html',
  styleUrls: ['./bill-items-assign-form.component.scss']
})
export class BillItemsAssignFormComponent implements OnInit {
  @Input() personBillItems: any;

  get billItems() {
    return this.personBillItems.billItemsForm.get('billItems') as FormArray;
  }

  constructor(public changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
  }

}
