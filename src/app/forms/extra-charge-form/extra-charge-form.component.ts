import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'extra-charge-form[extraChargeForm]',
  templateUrl: './extra-charge-form.component.html',
  styleUrls: ['./extra-charge-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExtraChargeFormComponent implements OnInit {
  @Input() extraChargeForm: FormGroup;

  constructor() {
  }

  ngOnInit() {
  }
}
