import { Component, OnInit } from '@angular/core';
import { BillsService } from 'src/app/bills/bills.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BillDto } from 'src/app/bills/bills';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { PeopleService } from 'src/app/people/people.service';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { BillingService } from '../billing.service';

@Component({
  selector: 'app-billing-payment',
  templateUrl: './billing-payment.component.html',
  styleUrls: ['./billing-payment.component.scss']
})
export class BillingPaymentComponent implements OnInit {
  vm: any;
  billForm: FormGroup;

  private personId = 1;

  constructor(private billsService: BillsService,
    private peopleService: PeopleService,
    private billingService: BillingService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) { }

    get billItems() {
      return this.billForm.get('billItems') as FormArray
    }

  ngOnInit() {
    this.activatedRoute.paramMap
      .subscribe(params => {
        const id = +params.get('id');

        if (0 == id) {
          return ;
        }

        combineLatest([
          this.billsService.getBill(id),
          this.peopleService.getPersonBillItems(this.personId)
        ]).pipe(
          map(([bill, personBillItems]) => {
            return {
              bill, 
              personBillItems
            };
          })
        ).subscribe(billPersonBillItems => {
          this.vm = {
            bill: billPersonBillItems.bill,
            extraCharges: billPersonBillItems.bill.extraCharges.map(item => item.rate),
            personBillItems: billPersonBillItems.personBillItems
          };

          this.billForm = this.fb.group({
            billItems: this.fb.array(this.vm.bill.billItems.map(item => {
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
        });
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
    this.billingService.updateBilling(personBilling)
      .subscribe();
  }
}
