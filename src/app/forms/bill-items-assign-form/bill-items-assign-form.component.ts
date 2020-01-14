import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'bill-items-assign-form[billItemsForm][participants]',
  templateUrl: './bill-items-assign-form.component.html',
  styleUrls: ['./bill-items-assign-form.component.scss']
})
export class BillItemsAssignFormComponent implements OnInit {
  @Input() billItemsForm: FormGroup;

  get billItems() {
    return this.billItemsForm.get('billItems') as FormArray;
  }

  @Input() participants;
  constructor() { }

  ngOnInit() {
  }

}
