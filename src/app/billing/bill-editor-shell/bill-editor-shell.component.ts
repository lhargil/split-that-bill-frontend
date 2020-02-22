import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReplaySubject, combineLatest, Subject } from 'rxjs';
import { takeUntil, tap, filter } from 'rxjs/operators';
import { WizardService } from 'src/app/wizard/wizard.service';
import { BillingStoreService, BillingStoreStateKeys } from '../billing-store.service';
import { BillFormComponent } from 'src/app/forms/bill-form/bill-form.component';
import { CurrenciesService } from '../currencies.service';
import { Currency } from '../models';

@Component({
  selector: 'app-bill-editor-shell',
  templateUrl: './bill-editor-shell.component.html',
  styles: []
})
export class BillEditorShellComponent implements OnInit, OnDestroy {
  @ViewChild('billFormComponent') billFormComponent: BillFormComponent;

  private destroyed$ = new Subject();
  billForm: FormGroup;
  currencies: Currency[];
  constructor(private fb: FormBuilder, private wizardService: WizardService, private billingStore: BillingStoreService,
    private currencyService: CurrenciesService) {
    this.billForm = this.createForm({
      establishmentName: '',
      billDate: new Date().toString(),
      remarks: '',
      currency: ''
    });
  }

  wizardStep$ = this.wizardService.wizardStep$;

  ngOnInit() {
    combineLatest([this.billingStore.getStoreSlice$(BillingStoreStateKeys.Bill),
    this.currencyService.getCurrencies()])
      .pipe(
        tap(([bill, currencies]) => {
          this.currencies = currencies;
          this.billForm = this.createForm(bill || {
            establishmentName: '',
            billDate: new Date().toString(),
            remarks: '',
            currency: ''
          });
        }),
        takeUntil(this.destroyed$),
      )
      .subscribe();

    this.wizardService.nextStep$
      .pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe(nextData => {
        if (nextData == null) { return; }
        this.formSubmit(_ => nextData.next());
      });
    this.wizardService.backStep$
      .pipe(
        takeUntil(this.destroyed$),
      )
      .subscribe(backData => {
        if (backData == null) { return; }
        this.formSubmit(_ => backData.back());
      });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private createForm(bill: { establishmentName: string; billDate: string; remarks: string, currency: string }) {
    const billDate = new Date(bill.billDate);
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
      currency: [bill.currency, [Validators.required]]
    });
  }

  private formSubmit(callback) {
    this.billForm.markAllAsTouched();
    this.billFormComponent.changeDetectorRef.detectChanges();
    if (!this.billForm.valid) {
      return;
    }

    const updatedBill = {
      ...this.billForm.value, ...{
        billDate: new Date(Date.UTC(this.billForm.get('billDateYear').value,
          this.billForm.get('billDateMonth').value - 1,
          this.billForm.get('billDateDay').value))
      }
    };
    this.billingStore.updateSlice(BillingStoreStateKeys.Bill, updatedBill);

    callback();
  }
}
