import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { BillsService } from '../bills.service';
import { BillDto, ExtraChargeDto } from '../bills';
import { GenericValidator } from '../../shared/generic-validator';
import { debounceTime, tap, catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-bills-editor',
  templateUrl: './bills-editor.component.html',
  styleUrls: ['./bills-editor.component.scss']
})
export class BillsEditorComponent implements OnInit {
  // Use with the generic validation message class
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  currentBill: BillDto;
  displayMessage: {[key: string]: string};
  billForm: FormGroup;
  datePickerList: {
    years: number[],
    months: {[key: number]: string}[],
    days: number[]
  }

  get extraCharges() {
    return <FormArray>this.billForm.get('extraCharges');
  }

  constructor(private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private billsService: BillsService,
    private router: Router) {
      this.validationMessages = {
        establishmentName: {
          required: 'Establishment name is required.',
          minlength: 'Minimum length is 3 characters'
        }
      };

      this.genericValidator = new GenericValidator(this.validationMessages);
    }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = +params.get('id');

      if (0 == id) {
        this.currentBill = this.getDefaultBill();
        this.billForm = this.createForm(this.currentBill);
      } else {
        this.billsService.getBill(id)
          .subscribe(bill => {
            this.currentBill = bill;
            this.billForm = this.createForm(this.currentBill)
          });
      }
    });

          
    this.billForm && this.billForm.valueChanges
    .pipe(
      debounceTime(1000)
    ).subscribe(valueChanges => {
      this.displayMessage = this.genericValidator.processMessages(this.billForm);
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
      extraCharges: this.fb.array(bill.extraCharges.map(ec => this.buildExtraCharge(ec)))
    });
  }

  getDatePickerList(date: Date) {
    let datePickerListToReturn: {
      years: number[],
      months: {[key: number]: string}[],
      days: number[]
    } = { years: [], months: [], days: [] };

    const year = date.getFullYear();
    for (let i = year; i >= year - 5; i--) {
      datePickerListToReturn.years.push(i);
    }

    const monthsInAYear = 12;
    for( var i = 0; i < monthsInAYear; i++ ){
      datePickerListToReturn.months[i] = new Date(0,i).toLocaleString('en-US',{month:'long'});
      // you can also pass a local like : "en-US" instead of an empty object `{}`.
      // an empty object triggers the system's auto-detection
    }

    datePickerListToReturn.days = [...this.getUpdatedDays(year, date.getMonth())];

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
    this.datePickerList = {...this.datePickerList, ...{days: this.getUpdatedDays(year, this.billForm.get('billDateMonth').value) }};
    this.setDaySelected();
  }

  monthChanged(month: number) {
    this.datePickerList = {...this.datePickerList, ...{days: this.getUpdatedDays(this.billForm.get('billDateYear').value, month)}};
    this.setDaySelected();
  }

  onBlur() {
    this.displayMessage = this.genericValidator.processMessages(this.billForm);
  }

  onSubmit(billForm: FormGroup) {
    if (!billForm.valid) {
      console.log("The bill is not valid.")
      return;
    }
    
    const updatedBill = {...this.currentBill, ...billForm.value, 
      ...{billDate: new Date(Date.UTC(billForm.get('billDateYear').value, billForm.get('billDateMonth').value - 1, billForm.get('billDateDay').value)).toUTCString()},
      ...{billItems: this.currentBill.billItems.map(item => {
        return {
          id: item.id,
          description: item.description,
          amount: item.unitPrice.amount
        }
      }), 
      ...{extraCharges: this.extraCharges.value.map(ec => {
        return {
          id: ec.id,
          description: ec.description,
          rate: ec.rate
        };
      })}}
    };
    console.log(JSON.stringify(updatedBill));
    // if (0 == updatedBill.id) {
    //   this.billsService.createBill(updatedBill)
    //     .subscribe(result => {
    //       this.redirect();
    //     }, catchError(error => {
    //       console.log(error);
    //       return EMPTY;
    //     }));
    // } else {
    //   this.billsService.updateBill(updatedBill)
    //     .subscribe(result => {
    //       this.redirect();
    //     }, catchError(error => {
    //       console.log(error);
    //       return EMPTY;
    //     }))
    // }
  }

  cancelEdit() {
    this.redirect();
  }

  addExtraCharge() {
    this.extraCharges.push(this.buildExtraCharge(null));
  }

  removeExtraCharge(index: number) {
    this.extraCharges.removeAt(index);
  }

  private buildExtraCharge(charge: ExtraChargeDto) {
    if (charge == null) {
      return this.fb.group({
        id: [0],
        description: ['', Validators.required],
        rate: [1, Validators.required]
      });
    }
    return this.fb.group({
      id: [charge.id],
      description: [charge.description, Validators.required],
      rate: [charge.rate, Validators.required] // TODO: decimal validator
    });
  }

  private getDefaultBill() {
    return {
      id: 0,
      establishmentName: '',
      billDate: new Date().toUTCString(),
      remarks: '',
      billItems: [],
      extraCharges: []
    };
  }

  private setDaySelected() {
    const daySelected = this.billForm.get('billDateDay');
    console.log(daySelected, JSON.stringify(this.datePickerList.days));
    if (this.datePickerList.days.indexOf(+daySelected.value) == -1) {
      daySelected.patchValue(1);
    }
  }

  private redirect() {
    this.billForm.reset();
    this.activatedRoute.parent
    this.router.navigate(['/bills']);
  }

  // Month here is 1-indexed (January is 1, February is 2, etc). This is
  // because we're using 0 as the day so that it returns the last day
  // of the last month, so you have to add 1 to the month number 
  // so it returns the correct amount of days
  private daysInMonth (month, year) {
    return new Date(year, month, 0).getUTCDate();
  }


}
