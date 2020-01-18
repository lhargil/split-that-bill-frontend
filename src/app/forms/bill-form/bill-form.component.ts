import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'bill-form[billForm]',
  templateUrl: './bill-form.component.html',
  styleUrls: ['./bill-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BillFormComponent implements OnInit {
  @Input() billForm: FormGroup;

  get participants() {
    return this.billForm.get('participants') as FormArray;
  }

  get extraCharges() {
    return this.billForm.get('extraCharges') as FormArray;
  }

  get billItems() {
    return this.billForm.get('billItems') as FormArray;
  }

  get establishmentName() {
    return this.billForm.get('establishmentName') as FormGroup;
  }

  datePickerList: {
    years: number[],
    months: { [key: number]: string }[],
    days: number[]
  };

  constructor(public changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.datePickerList = this.getDatePickerList(new Date());
  }

  yearChanged(year: number) {
    this.datePickerList = { ...this.datePickerList, ...{ days: this.getUpdatedDays(year, this.billForm.get('billDateMonth').value) } };
    this.setDaySelected();
  }

  monthChanged(month: number) {
    this.datePickerList = { ...this.datePickerList, ...{ days: this.getUpdatedDays(this.billForm.get('billDateYear').value, month) } };
    this.setDaySelected();
  }

  private setDaySelected() {
    const daySelected = this.billForm.get('billDateDay');
    if (this.datePickerList.days.indexOf(+daySelected.value) == -1) {
      daySelected.patchValue(1);
    }
  }

  private getDatePickerList(date: Date) {
    const datePickerListToReturn: {
      years: number[],
      months: { [key: number]: string }[],
      days: number[]
    } = { years: [], months: [], days: [] };

    const year = date.getFullYear();
    for (let i = year; i >= year - 5; i--) {
      datePickerListToReturn.years.push(i);
    }

    const monthsInAYear = 12;
    for (let i = 0; i < monthsInAYear; i++) {
      datePickerListToReturn.months.push(new Date(2019, i, 1).toLocaleString('en-US', { month: 'long' }));
      // you can also pass a local like : "en-US" instead of an empty object `{}`.
      // an empty object triggers the system's auto-detection
    }

    datePickerListToReturn.days = [...this.getUpdatedDays(year, date.getMonth() + 1)];

    return datePickerListToReturn;
  }

  private getUpdatedDays(year, month) {
    const days = [];
    const daysInMonth = this.daysInMonth(month, year);
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  }

  private daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }
}
