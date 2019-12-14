import { Component, OnInit } from '@angular/core';
import { BillsService } from 'src/app/bills/bills.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { PeopleService } from 'src/app/people/people.service';
import { Subscription, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BillingService } from '../billing.service';
import { Billing } from '../billing';

@Component({
  selector: 'app-billing-payment',
  templateUrl: './billing-payment.component.html',
  styleUrls: ['./billing-payment.component.scss']
})
export class BillingPaymentComponent implements OnInit {
  vm: Billing;
  participantsPayable: any;
  billingForm: FormGroup;
  sub: Subscription;

  constructor(private billingService: BillingService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) { }

  get billItems() {
    return this.billingForm.get('billItems') as FormArray
  }

  vm$ = this.activatedRoute.paramMap.pipe(
    switchMap(paramMap => {
      const id = +paramMap.get('id');
      return this.billingService.getBillings(id);
    })
  );
  ngOnInit() {
    this.sub = this.vm$.subscribe(billing => {
      this.vm = billing;
      this.participantsPayable = this.vm.bill.participants.map(p => {
        const personBilling = this.vm.peopleBilling.filter(item => item.person && item.person.id == p.person.id);
        const billItems = [...personBilling.map(item => {
          return item.billItem && {
            id: item.billItem.id,
            priceWithCharges: item.billItem.priceWithCharges
          };
        })];
        return {
          ...p,
          billItems,
          totalPayable: {
            ...p.totalPayable,
            ...{
              amount: billItems.reduce((acc, curr) => {
                return acc + curr.priceWithCharges.amount;
              }, 0)
            }
          }
        };
      });
      this.billingForm = this.createForm(this.vm);
    })
  }

  ngOnDestroy() {
    this.sub && this.sub.unsubscribe()
  }

  onSubmit() {
    if (this.billingForm.invalid) {
      console.log('The form is not valid.');
      return;
    }
    console.log(JSON.stringify(this.billingForm.get('billItems').value));
    const billItems = this.billingForm.value.billItems as any[];

    const peopleBilling = this.vm.bill.participants.map(p => {
      const assignedItems = billItems.filter(item => +item.assignee == p.person.id)
        .map(item => {
          return {
            id: item.itemId,
            description: item.itemDescription,
            amount: item.amount
            // TODO: discount field
          }
        });

      return {
        person: { ...p.person },
        billItems: assignedItems
      };
    });

    combineLatest(peopleBilling.map(
      pb => this.billingService.updatePersonBilling(this.vm.bill.id, pb.person.id, pb)
    )).subscribe(() => {
      console.log('Billings updated.');
      this.redirect();
    })

  }

  cancelEdit() {
    this.redirect();
  }

  redirect() {
    this.router.navigate(['/bills']);
  }

  onChange($event: any, billItem: FormControl) {
    this.participantsPayable = this.participantsPayable.map(p => {
      const billItems = [...this.billItems.value.filter(item => +item.assignee == p.person.id)];
      return {
        ...p,
        billItems: billItems.map(item => {
          return {
            id: item.itemId,
            priceWithCharges: item.priceWithCharges
          };
        }),
        totalPayable: {
          ...p.totalPayable,
          ...{
            amount: billItems.reduce((acc, curr) => {
              return acc + curr.priceWithCharges;
            }, 0)
          }
        }
      }
    });
  }

  private createForm(billing: Billing) {
    const form = this.fb.group({
      billItems: this.fb.array(billing.peopleBilling.map(pb => {
        return this.fb.group({
          itemId: [pb.billItem.id],
          itemDescription: [pb.billItem.description],
          amount: [pb.billItem.unitPrice.amount],
          currency: [pb.billItem.unitPrice.currency],
          priceWithCharges: [pb.billItem.priceWithCharges.amount],
          assignee: [pb.person && pb.person.id || '']
        })
      }))
    });
    return form;
  }
}
