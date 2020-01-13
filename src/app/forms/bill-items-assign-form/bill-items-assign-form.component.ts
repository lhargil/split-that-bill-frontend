import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'bill-items-assign-form[billItemsForm]',
  templateUrl: './bill-items-assign-form.component.html',
  styleUrls: ['./bill-items-assign-form.component.scss']
})
export class BillItemsAssignFormComponent implements OnInit {
  @Input() billItemsForm: FormGroup;

  get billItems() {
    return this.billItemsForm.get('billItems') as FormArray;
  }

  participants = [{
    person: {
      id: 1,
      fullname: 'lhar gil'
    }
  }];
  constructor() { }

  ngOnInit() {
  }

}
