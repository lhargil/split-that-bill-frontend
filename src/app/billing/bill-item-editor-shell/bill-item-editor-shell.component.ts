import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { decimalAmountValidator } from 'src/app/shared/validators/decimal-amount.validator';

@Component({
  selector: 'app-bill-item-editor-shell',
  templateUrl: './bill-item-editor-shell.component.html',
  styles: []
})
export class BillItemEditorShellComponent implements OnInit {
  @Input() formData: any;
  billItemForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.billItemForm = this.formBuilder.group({
      id: [''],
      description: ['', [Validators.required, Validators.minLength]],
      amount: [Number(0).toFixed(2), [Validators.required, Validators.min(0.01), decimalAmountValidator()]],
      discount: [0, [decimalAmountValidator(true)]]
    });
  }
  ngOnInit() {
    this.billItemForm.patchValue(this.formData);
  }
  formSubmit(onFormSubmitted: (data) => void) {
    this.billItemForm.markAllAsTouched();

    if (this.billItemForm.invalid) {
      return;
    }

    const updatedBillItem = { ...this.billItemForm.value };
    onFormSubmitted(updatedBillItem);
  }

  // @ViewChild('billItemsFormComponent') billItemsFormComponent: BillItemsFormComponent;

  // private destroyed$ = new ReplaySubject(0);
  // private billItemsManager: BillItemsManager;
  // private billItemsList: BillItem[];

  // get billItems() {
  //   return this.billItemsManager.billItems;
  // }

  // get billItemsForm() {
  //   return this.billItemsManager.billItemsForm;
  // }

  // constructor(private fb: FormBuilder, private wizardService: WizardService, private billingStore: BillingStoreService) {
  //   this.billItemsList = [];
  //   this.billItemsManager = new BillItemsManager(fb, this.billItemsList);
  // }

  // wizardStep$ = this.wizardService.wizardStep$;

  // ngOnInit() {
  //   this.billingStore.getStoreSlice$(BillingStoreStateKeys.BillItems)
  //     .pipe(takeUntil(this.destroyed$),
  //       tap(billItems => {
  //         this.billItemsManager.populateList(billItems || []);
  //         this.billItemsManager.createForm();
  //       })
  //     )
  //     .subscribe();

  //   this.wizardService.nextStep$
  //     .pipe(takeUntil(this.destroyed$))
  //     .subscribe(nextData => {
  //       if (nextData == null) { return; }

  //       this.formSubmit(() => nextData.next());
  //     });

  //   this.wizardService.backStep$
  //     .pipe(takeUntil(this.destroyed$))
  //     .subscribe(backData => {
  //       if (backData == null) { return; }
  //       this.formSubmit(() => backData.back());
  //     });
  // }

  // ngOnDestroy() {
  //   this.destroyed$.next(true);
  //   this.destroyed$.complete();
  // }

  // addBillItem() {
  //   this.billItemsManager.addBillItem();
  // }

  // removeBillItem(data: { index: number, id: number }) {
  //   this.billItemsManager.removeBillItem(data.index);
  // }

  // private formSubmit(onFormSubmitted: () => void) {
  //   this.billItemsForm.markAllAsTouched();
  //   this.billItemsFormComponent.changeDetectorRef.detectChanges();

  //   if (!this.billItemsForm.valid) {
  //     return;
  //   }

  //   const updatedBillItems = [...this.billItems.value];
  //   this.billingStore.updateSlice(BillingStoreStateKeys.BillItems, updatedBillItems);
  //   onFormSubmitted();
  // }
}
