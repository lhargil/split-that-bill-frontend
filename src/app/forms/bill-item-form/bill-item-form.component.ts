import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'bill-item-form[billItemForm]',
  templateUrl: './bill-item-form.component.html',
  styleUrls: ['./bill-item-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BillItemFormComponent implements OnInit {
  @Input() billItemForm: FormGroup;

  constructor() {
  }

  ngOnInit() {
  }
}
