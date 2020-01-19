import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { decimalAmountValidator } from 'src/app/shared/validators/decimal-amount.directive';
import { ReplaySubject } from 'rxjs';
import { WizardService } from 'src/app/wizard/wizard.service';
import { takeUntil, tap } from 'rxjs/operators';
import { BillItemsFormComponent } from 'src/app/forms/bill-items-form/bill-items-form.component';
import { BillingStoreService, BillingStoreStateKeys } from '../billing-store.service';

@Component({
  selector: 'app-bill-items-editor-shell',
  templateUrl: './bill-items-editor-shell.component.html',
  styles: []
})
export class BillItemsEditorShellComponent implements OnInit, OnDestroy {
  @ViewChild('billItemsFormComponent', { static: false }) billItemsFormComponent: BillItemsFormComponent;

  private destroyed$ = new ReplaySubject(0);
  private defaultBillItems = [{
    description: '',
    amount: 0,
    discount: ''
  }];

  billItemsForm: FormGroup;

  get billItems() {
    return this.billItemsForm.get('billItems') as FormArray;
  }

  constructor(private fb: FormBuilder, private wizardService: WizardService, private billingStore: BillingStoreService) {
    this.billItemsForm = this.createForm(this.defaultBillItems);
  }

  wizardStep$ = this.wizardService.wizardStep$;

  ngOnInit() {
    this.billingStore.getStoreSlice$(BillingStoreStateKeys.BillItems)
      .pipe(takeUntil(this.destroyed$),
        tap(console.log),
        tap(billItems => {
          this.billItemsForm = this.createForm(billItems && billItems.length > 0 ? billItems : this.defaultBillItems);
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

  addBillItem() {
    this.billItems.push(this.fb.group({
      description: ['', [Validators.required, Validators.minLength]],
      amount: [Number(0).toFixed(2), [Validators.required, decimalAmountValidator()]],
      discount: ['', [decimalAmountValidator(true)]]
    }));
  }

  removeBillItem(index: number) {
    this.billItems.removeAt(index);

    if (this.billItems.length <= 0) {
      this.addBillItem();
    }
  }

  private createForm(items) {
    return this.fb.group({
      billItems: this.fb.array(items.map(item => {
        return this.fb.group({
          description: [item.description, [Validators.required, Validators.minLength]],
          amount: [Number(item.amount).toFixed(2), [Validators.required, decimalAmountValidator()]],
          discount: [item.discount, [decimalAmountValidator(true)]]
        });
      })),
    });
  }

  private formSubmit(callback) {
    this.billItemsForm.markAllAsTouched();
    this.billItemsFormComponent.changeDetectorRef.detectChanges();
    if (!this.billItemsForm.valid) {
      return;
    }

    const updatedBillItems = [...this.billItemsForm.get('billItems').value];
    this.billingStore.updateSlice(BillingStoreStateKeys.BillItems, updatedBillItems);
    callback();
  }
}
