import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { BillsService } from '../bills.service';
import { BillDto, ExtraChargeDto, BillItemDto, Money } from '../bills';
import { catchError, switchMap, map } from 'rxjs/operators';
import { EMPTY, combineLatest, of } from 'rxjs';
import { PeopleService } from 'src/app/people/people.service';
import { decimalAmountValidator } from 'src/app/shared/validators';

@Component({
  selector: 'app-bills-editor',
  templateUrl: './bills-editor.component.html',
  styleUrls: ['./bills-editor.component.scss']
})
export class BillsEditorComponent implements OnInit {
  // Use with the generic validation message class
  private validationMessages: { [key: string]: { [key: string]: string } };

  currentBill: BillDto;
  people: any[];
  displayMessage: { [key: string]: string };
  billForm: FormGroup;
  datePickerList: {
    years: number[],
    months: { [key: number]: string }[],
    days: number[]
  }

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

  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder, private billsService: BillsService, private peopleService: PeopleService, private router: Router) {
    this.validationMessages = {
      establishmentName: {
        required: 'Establishment name is required.',
        minlength: 'Minimum length is 3 characters'
      }
    };

  }

  currentBill$ = this.activatedRoute.paramMap
    .pipe(
      switchMap(params => {
        const id = +params.get('id');
        if (0 < id) {
          return this.billsService.getBill(id);
        } else {
          return of(this.getDefaultBill());
        }
      })
    );


  ngOnInit() {
    combineLatest([this.currentBill$, this.peopleService.getPeople()])
      .pipe(
        map(([bill, people]) => {
          return {
            bill,
            people: people.map(p => {
              const billParticipant = bill.participants.find(bp => bp.person.id == p.id);
              return {
                ...p,
                bpId: billParticipant == null ? 0 : billParticipant.id,
                selected: billParticipant != null
              };
            })
          };
        })
      )
      .subscribe(item => {
        this.currentBill = item.bill;
        this.people = item.people;
        this.billForm = this.createForm(this.currentBill);
      });
  }

  createForm(bill: BillDto) {
    const billDate = new Date(bill.billDate);
    this.datePickerList = this.getDatePickerList(billDate);
    return this.fb.group({
      establishmentName: [bill.establishmentName,
      [
        Validators.required,
        Validators.minLength(3)
      ]],
      billDateYear: [billDate.getFullYear(), [Validators.required]],
      billDateMonth: [billDate.getMonth() + 1, [Validators.required]],
      billDateDay: [billDate.getDate(), [Validators.required]],
      remarks: [bill.remarks],
      billItems: this.fb.array(bill.billItems.map(bi => this.buildBillItem(bi))),
      extraCharges: this.fb.array(bill.extraCharges.map(ec => this.buildExtraCharge(ec))),
      participants: this.fb.array(this.people.map(p => {
        return this.fb.group({
          id: [p.id],
          fullname: [p.fullname],
          selected: [p.selected],
          bpId: [p.bpId]
        })
      }))
    });
  }

  getDatePickerList(date: Date) {
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

  getUpdatedDays(year, month) {
    const days = [];
    const daysInMonth = this.daysInMonth(month, year);
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  }

  yearChanged(year: number) {
    this.datePickerList = { ...this.datePickerList, ...{ days: this.getUpdatedDays(year, this.billForm.get('billDateMonth').value) } };
    this.setDaySelected();
  }

  monthChanged(month: number) {
    this.datePickerList = { ...this.datePickerList, ...{ days: this.getUpdatedDays(this.billForm.get('billDateYear').value, month) } };
    this.setDaySelected();
  }

  onSubmit(billForm: FormGroup) {
    if (!billForm.valid) {
      return;
    }
    const updatedBill = {
      ...this.currentBill, ...billForm.value,
      ...{
        billDate: new Date(Date.UTC(billForm.get('billDateYear').value,
          billForm.get('billDateMonth').value - 1,
          billForm.get('billDateDay').value))
      },
      ...{
        billItems: this.billItems.value.map(item => {
          return {
            id: item.id,
            description: item.description,
            amount: item.amount,
            discount: Number(item.discount) > 0 ? Number(item.discount) : null
          };
        }),
        ...{
          extraCharges: this.extraCharges.value.map(ec => {
            return {
              id: ec.id,
              description: ec.description,
              rate: Number(ec.rate) / 100
            };
          })
        },
        ...{
          participants: this.participants.value.filter(p => p.selected).map(p => {
            return {
              id: p.bpId,
              person: {
                id: p.id
              }
            }
          })
        }
      }
    };
    if (0 == updatedBill.id) {
      this.billsService.createBill(updatedBill)
        .subscribe(() => {
          this.redirect();
        }, () => console.log('Unable to create a new bill'));
    } else {
      this.billsService.updateBill(updatedBill)
        .subscribe(() => {
          this.redirect();
        }, catchError(error => {
          console.log(error);
          return EMPTY;
        }));
    }
  }

  cancelEdit() {
    this.redirect();
  }

  addBillItem() {
    this.billItems.push(this.buildBillItem(null));
  }

  removeBillItem(index: number) {
    this.billItems.removeAt(index);
    if (this.billItems.value.length <= 0) {
      this.addBillItem();
    }
  }

  addExtraCharge() {
    this.extraCharges.push(this.buildExtraCharge(null));
  }

  removeExtraCharge(index: number) {
    this.extraCharges.removeAt(index);
    if (this.extraCharges.value.length <= 0) {
      this.addExtraCharge();
    }
  }

  removeParticipant(id: number) {
    this.participants.removeAt(id);
  }

  private buildBillItem(billItem: BillItemDto) {
    if (billItem == null) {
      return this.fb.group({
        id: [0],
        description: ['', [Validators.required, Validators.minLength]],
        amount: [Number(0).toFixed(2), [Validators.required, decimalAmountValidator()]],
        discount: [null, [decimalAmountValidator(true)]]
      });
    }
    return this.fb.group({
      id: [billItem.id],
      description: [billItem.description, [Validators.required, Validators.minLength]],
      amount: [billItem.unitPrice.amount.toFixed(2), [Validators.required, decimalAmountValidator()]],
      discount: [billItem.discount, [decimalAmountValidator(true)]]
    });
  }

  private buildExtraCharge(charge: ExtraChargeDto) {
    if (charge == null) {
      return this.fb.group({
        id: [0],
        description: ['', [Validators.required, Validators.minLength]],
        rate: [0, [Validators.required, decimalAmountValidator()]]
      });
    }
    return this.fb.group({
      id: [charge.id],
      description: [charge.description, [Validators.required, Validators.minLength]],
      rate: [(charge.rate * 100).toFixed(), [Validators.required, decimalAmountValidator()]]
    });
  }

  private getDefaultBill() {
    const emptyBillItem = {
      id: 0,
      description: '',
      unitPrice: { currency: 'MYR', amount: 0 } as Money,
      priceWithCharges: { currency: 'MYR', amount: 0 } as Money,
    };
    const emptyExtraCharge = {
      id: 0,
      description: '',
      rate: 0
    };
    return {
      id: 0,
      establishmentName: '',
      billDate: new Date().toUTCString(),
      remarks: '',
      billItems: [emptyBillItem],
      extraCharges: [emptyExtraCharge],
      participants: [],
      billTotal: 0,
      billTotalWithoutCharges: 0,
      totalCharges: 0,
    } as BillDto;
  }

  private setDaySelected() {
    const daySelected = this.billForm.get('billDateDay');
    if (this.datePickerList.days.indexOf(+daySelected.value) == -1) {
      daySelected.patchValue(1);
    }
  }

  private redirect() {
    this.billForm.reset();
    this.router.navigate(['/bills']);
  }

  // Month here is 1-indexed (January is 1, February is 2, etc). This is
  // because we're using 0 as the day so that it returns the last day
  // of the last month, so you have to add 1 to the month number
  // so it returns the correct amount of days
  private daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }
}
