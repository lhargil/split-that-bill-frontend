import { Component, OnInit } from '@angular/core';
import { BillsService } from 'src/app/bills/bills.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BillDto, BillItemDto } from 'src/app/bills/bills';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { PeopleService } from 'src/app/people/people.service';
import { combineLatest, throwError, of, Subscription } from 'rxjs';
import { map, switchMap, combineAll, withLatestFrom, catchError } from 'rxjs/operators';
import { BillingService } from '../billing.service';
import { PersonBillItems } from 'src/app/people/person';

@Component({
  selector: 'app-billing-payment',
  templateUrl: './billing-payment.component.html',
  styleUrls: ['./billing-payment.component.scss']
})
export class BillingPaymentComponent implements OnInit {
  vm: any;
  billForm: FormGroup;
  sub: Subscription;
  private personId = 2;

  constructor(private billsService: BillsService,
    private peopleService: PeopleService,
    private billingService: BillingService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) { }

    get billItems() {
      return this.billForm.get('billItems') as FormArray
    }

  vm$ = this.activatedRoute.paramMap.pipe(
    switchMap(paramMap => {
      const id = +paramMap.get('id');

      return combineLatest([
        this.billsService.getBill(id),
        this.peopleService.getPersonBillItems(this.personId)
      ]);
    }),
    map(([bill, personBillItems]) => {
      const extraCharges = bill.extraCharges.map(item => item.rate);
      const aggregate = {
        bill: bill,
        extraCharges,
        personBillItems: {...personBillItems, ...{totalPayable: personBillItems.bills.reduce((acc, curr) => {
          const accUnitPrice = acc.amount + curr.unitPrice.amount;
          return {
            ...acc,
            amount: extraCharges.reduce((a, b) => a+b) * curr.unitPrice.amount + accUnitPrice
          };
        }, {amount: 0, currency: 'MYR'})}}
      };
      return {
        aggregate,
        billForm: this.createForm(aggregate)
      };
    })
  );
  ngOnInit() { 
    this.sub = this.vm$.subscribe(item => {
      this.vm = item.aggregate,
      this.billForm = item.billForm;
    });
  }

  ngOnDestroy() {
    this.sub && this.sub.unsubscribe()
  }

  onAssign(checkedEvent: any) {
    const modifier = checkedEvent.value.checked ? 1 : -1;
    const amount = checkedEvent.value.unitPrice.amount * modifier;

    this.vm.personBillItems = {
      ...this.vm.personBillItems,
      totalPayable: {
        ...this.vm.personBillItems.totalPayable,
        amount: this.vm.personBillItems.totalPayable.amount + (amount * this.vm.extraCharges.reduce((a, b) => a+b) + amount)
      }
    };
  }

  private createForm(billPersonBillItems: { bill: BillDto; personBillItems: PersonBillItems; }) {
    return this.fb.group({
      billItems: this.fb.array(billPersonBillItems.bill.billItems.map(item => {
        return this.fb.group({
          id: [item.id],
          description: [item.description],
          unitPrice: this.fb.group({
            amount: [item.unitPrice.amount],
            currency: [item.unitPrice.currency]
          }),
          checked: billPersonBillItems.personBillItems.bills.find(b => b.id == item.id) != null
        });
      }))
    });
  }

  onSubmit() {
    if (this.billForm.invalid) {
      console.log('The form is not valid.');
      return;
    }

    const personBilling = {...{bill: this.vm.bill}, ...this.vm.personBillItems, ...{billItems: this.billForm.value.billItems.filter(item => item.checked).map(item => {
      return {
        id: item.id,
        description: item.description,
        amount: item.unitPrice.amount
      };
    })}};
    console.log(JSON.stringify(personBilling));
    this.billingService.updatePersonBilling(this.personId, personBilling)
      .subscribe(() => this.redirect());
  }

  cancelEdit() {
    this.redirect();
  }

  redirect() {
    this.router.navigate(['/billing']);
  }
}
