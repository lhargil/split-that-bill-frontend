import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'extra-charges-form[extraChargesForm]',
  templateUrl: './extra-charges-form.component.html',
  styleUrls: ['./extra-charges-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExtraChargesFormComponent implements OnInit {
  @Input() extraChargesForm: FormGroup;
  @Output() addExtraCharge: EventEmitter<number>;
  @Output() removeExtraCharge: EventEmitter<number>;

  get extraCharges() {
    return this.extraChargesForm.get('extraCharges') as FormArray;
  }
  constructor() {
    this.addExtraCharge = new EventEmitter<number>();
    this.removeExtraCharge = new EventEmitter<number>();
  }

  ngOnInit() {
  }

  add() {
    this.addExtraCharge.emit(0);
  }

  remove(index: number) {
    this.removeExtraCharge.emit(index);
  }
}
