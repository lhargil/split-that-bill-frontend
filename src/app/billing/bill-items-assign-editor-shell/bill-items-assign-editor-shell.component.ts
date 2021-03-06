import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { WizardService } from 'src/app/wizard/wizard.service';
import { takeUntil, tap, map } from 'rxjs/operators';
import { ReplaySubject, combineLatest } from 'rxjs';
import { Person } from 'src/app/people/person';
import { BillItemsAssignFormComponent } from 'src/app/forms/bill-items-assign-form/bill-items-assign-form.component';
import { BillingStoreService, BillingStoreStateKeys } from '../billing-store.service';

@Component({
  selector: 'app-bill-items-assign-editor-shell',
  templateUrl: './bill-items-assign-editor-shell.component.html',
  styles: []
})
export class BillItemsAssignEditorShellComponent implements OnInit, OnDestroy {
  @ViewChild('personBillItemsComponent') personBillItemsComponent: BillItemsAssignFormComponent;
  private destroyed$ = new ReplaySubject(0);
  vm: {
    billItemsForm: FormGroup;
    participants: {
      externalId: string;
      firstname: string;
      lastname: string;
    }[];
  };

  constructor(private wizardService: WizardService, private fb: FormBuilder, private billingStore: BillingStoreService) {
    this.vm = {
      billItemsForm: this.createForm([], { currency: '' }),
      participants: []
    };
  }

  wizardStep$ = this.wizardService.wizardStep$;

  ngOnInit() {
    this.billingStore.store$
      .pipe(
        map(store => {
          const totalExtraCharges = store.extraCharges.reduce((acc, curr) => {
            return acc + (Number(curr.amount) / 100);
          }, 0);
          const personBillItems = store.billItems.map(bi => {
            const assignee = store.personBillItems &&
              store.personBillItems.find(pbi => pbi.itemId == bi.id);
            const discount = Number(bi.discount) / 100 || 0;
            const discountedAmount = Number(bi.amount) - (Number(bi.amount) * discount);
            return {
              itemId: bi.id,
              itemDescription: bi.description,
              amount: bi.amount,
              discount,
              currency: store.bill.currency,
              totalExtraCharges,
              priceWithCharges: discountedAmount + (discountedAmount * totalExtraCharges),
              assignee: (assignee && assignee.assignee || 0) || 0,
            };
          });

          return {
            participants: store.friends.filter(f => f.selected) || [],
            personBillItems,
            bill: store.bill
          };
        }),
        tap(vm => {
          this.vm.participants = vm.participants;
          this.vm.billItemsForm = this.createForm(vm.personBillItems, vm.bill);
        }),
        takeUntil(this.destroyed$),
      )
      .subscribe();

    this.wizardService.nextStep$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(nextData => {
        if (nextData == null) { return; }
        this.formSubmit(_ => nextData.next());
      });

    this.wizardService.backStep$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(backData => {
        if (backData == null) { return; }
        this.formSubmit(_ => backData.back());
      });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  private createForm(personBillItems, bill) {
    return this.fb.group({
      billItems: this.fb.array(personBillItems.map(pb => {
        return this.fb.group({
          itemId: [pb.itemId],
          itemDescription: [pb.itemDescription],
          amount: [Number(pb.amount)],
          currency: [bill.currency],
          totalExtraCharges: [pb.totalExtraCharges],
          discount: [pb.discount],
          priceWithCharges: [Number(pb.priceWithCharges)],
          assignee: [pb.assignee]
        });
      }))
    });
  }

  private formSubmit(callback) {
    this.vm.billItemsForm.markAllAsTouched();
    this.personBillItemsComponent.changeDetectorRef.detectChanges();
    if (!this.vm.billItemsForm.valid) {
      return;
    }

    const updatedPersonBillItems = [...this.vm.billItemsForm.get('billItems').value
      .map(bi => {
        return {
          itemId: bi.itemId,
          assignee: bi.assignee
        };
      })];
    this.billingStore.updateSlice(BillingStoreStateKeys.PersonBillItems, updatedPersonBillItems);

    callback();
  }
}
