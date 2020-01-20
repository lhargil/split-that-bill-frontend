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
  @ViewChild('personBillItemsComponent', { static: false }) personBillItemsComponent: BillItemsAssignFormComponent;
  private destroyed$ = new ReplaySubject(0);
  vm: {
    billItemsForm: FormGroup;
    participants: {
      id: number;
      firstname: string;
      lastname: string;
    }[];
  };

  constructor(private wizardService: WizardService, private fb: FormBuilder, private billingStore: BillingStoreService) {
    this.vm = {
      billItemsForm: this.createForm([{
        itemId: 0,
        itemDescription: 'Nasi Lemak',
        amount: 10,
        currency: 'MYR',
        priceWithCharges: 12,
        assignee: 0
      }, {
        itemId: 0,
        itemDescription: 'Juice',
        amount: 25,
        currency: 'MYR',
        priceWithCharges: 30,
        assignee: 0
      }]),
      participants: [{
        id: 1,
        firstname: 'lhar',
        lastname: 'gil'
      }]
    };
  }

  wizardStep$ = this.wizardService.wizardStep$;

  ngOnInit() {
    this.billingStore.store$
      .pipe(
        takeUntil(this.destroyed$),
        map(store => {
          const priceWithCharges = store.extraCharges.reduce((acc, curr) => {
            return acc + (Number(curr.rate) / 100);
          }, 0);
          const personBillItems = store.billItems.map(bi => {
            const assignee = store.personBillItems &&
              store.personBillItems.find(pbi => pbi.itemId == bi.id);
            return {
              itemId: bi.id,
              itemDescription: bi.description,
              amount: bi.amount,
              currency: 'MYR',
              priceWithCharges: Number(bi.amount) + (bi.amount * priceWithCharges),
              assignee: (assignee && assignee.assignee || 0) || 0,
            };
          });

          return {
            participants: store.friends || [],
            personBillItems
          };
        }),
        tap(vm => {
          this.vm.participants = vm.participants;
          this.vm.billItemsForm = this.createForm(vm.personBillItems);
        })
      )
      .subscribe();

    this.wizardService.nextStep$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(nextData => {
        if (nextData == null) return;
        this.formSubmit(_ => nextData.next());
      });

    this.wizardService.backStep$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(backData => {
        if (backData == null) return;
        this.formSubmit(_ => backData.back());
      });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  private createForm(personBillItems) {
    return this.fb.group({
      billItems: this.fb.array(personBillItems.map(pb => {
        return this.fb.group({
          itemId: [pb.itemId],
          itemDescription: [pb.itemDescription],
          amount: [Number(pb.amount)],
          currency: ['MYR'],
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
      .filter(bi => this.vm.participants.some(p => p.id == Number(bi.assignee)))
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
