import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { decimalAmountValidator } from 'src/app/shared/validators/decimal-amount.directive';
import { ReplaySubject } from 'rxjs';
import { WizardService } from 'src/app/wizard/wizard.service';
import { takeUntil, tap } from 'rxjs/operators';
import { BillItemsFormComponent } from 'src/app/forms/bill-items-form/bill-items-form.component';
import { BillingStoreService, BillingStoreStateKeys } from '../billing-store.service';
import { BillItemsManager } from '../models/bill-items-manager';
import { BillItem } from '../models';

@Component({
  selector: 'app-bill-items-editor-shell',
  templateUrl: './bill-items-editor-shell.component.html',
  styles: []
})
export class BillItemsEditorShellComponent implements OnInit, OnDestroy {
  @ViewChild('billItemsFormComponent', { static: false }) billItemsFormComponent: BillItemsFormComponent;

  private destroyed$ = new ReplaySubject(0);
  private billItemsManager: BillItemsManager;
  private billItemsList: BillItem[];

  get billItems() {
    return this.billItemsManager.billItems;
  }

  get billItemsForm() {
    return this.billItemsManager.billItemsForm;
  }

  constructor(private fb: FormBuilder, private wizardService: WizardService, private billingStore: BillingStoreService) {
    this.billItemsList = [];
    this.billItemsManager = new BillItemsManager(fb, this.billItemsList);
  }

  wizardStep$ = this.wizardService.wizardStep$;

  ngOnInit() {
    this.billingStore.getStoreSlice$(BillingStoreStateKeys.BillItems)
      .pipe(takeUntil(this.destroyed$),
        tap(billItems => {
          this.billItemsList.splice(0);
          billItems.forEach(item => this.billItemsList.push(item));
          this.billItemsManager.createForm();
        })
      )
      .subscribe();

    this.wizardService.nextStep$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(nextData => {
        if (nextData == null) { return; }

        this.formSubmit(() => nextData.next());
      });

    this.wizardService.backStep$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(backData => {
        if (backData == null) { return; }
        this.formSubmit(() => backData.back());
      });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  addBillItem() {
    this.billItemsManager.addBillItem(this.billItemsManager.createBillItem());
  }

  removeBillItem(data: { index: number, id: number }) {
    this.billItemsManager.removeBillItem(data.index);
  }

  private formSubmit(onFormSubmitted: () => void) {
    this.billItemsForm.markAllAsTouched();
    this.billItemsFormComponent.changeDetectorRef.detectChanges();

    if (!this.billItemsForm.valid) {
      return;
    }

    const updatedBillItems = [...this.billItems.value];
    this.billingStore.updateSlice(BillingStoreStateKeys.BillItems, updatedBillItems);
    onFormSubmitted();
  }
}
