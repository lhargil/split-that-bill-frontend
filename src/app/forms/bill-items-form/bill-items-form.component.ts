import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'bill-items-form[billItemsForm]',
  templateUrl: './bill-items-form.component.html',
  styleUrls: ['./bill-items-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BillItemsFormComponent implements OnInit {
  @Input() billItemsForm: FormGroup;
  @Output() addBillItem: EventEmitter<void>;
  @Output() removeBillItem: EventEmitter<number>;

  get billItems() {
    return (this.billItemsForm.get('billItems') as FormArray);
  }
  constructor(public changeDetectorRef: ChangeDetectorRef) {
    this.addBillItem = new EventEmitter();
    this.removeBillItem = new EventEmitter();
  }

  ngOnInit() {
  }

  add() {
    this.addBillItem.emit();
  }
  remove(index: number) {
    this.removeBillItem.emit(index);
  }
}
