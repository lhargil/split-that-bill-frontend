import { Component, OnInit, OnDestroy } from '@angular/core';
import { BillingStoreService, BillingStoreStateKeys } from '../billing-store.service';
import { WizardService } from 'src/app/wizard/wizard.service';
import { combineLatest, Subject } from 'rxjs';
import { tap, map, takeUntil } from 'rxjs/operators';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { IdGenerator } from 'src/app/shared/utilities';
import { BillItemEditorShellComponent } from '../bill-item-editor-shell/bill-item-editor-shell.component';

@Component({
  selector: 'app-bill-items-shell',
  templateUrl: './bill-items-shell.component.html',
  styleUrls: ['./bill-items-shell.component.scss']
})
export class BillItemsShellComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject();
  private billItemsFromStore = [];
  constructor(private wizardService: WizardService, private billingStore: BillingStoreService, private modalService: ModalService) { }

  vm$ = combineLatest(
    this.wizardService.wizardStep$,
    this.billingStore.getStoreSlice$(BillingStoreStateKeys.BillItems)
  ).pipe(
    tap(([wizardStep, billItems]) => {
      this.billItemsFromStore = billItems;
    }),
    map(([wizardStep, billItems]) => {
      return {
        wizardStep,
        billItems
      };
    }),
  );

  ngOnInit(): void {
    this.wizardService.nextStep$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(nextData => {
        if (nextData == null) { return; }

        nextData.next();
      });

    this.wizardService.backStep$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(backData => {
        if (backData == null) { return; }
        backData.back();
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  addBillItem() {
    this.modalService.show({
      heading: 'Add bill item',
      formData: {
        id: IdGenerator.generate(-1, -100),
        description: '',
        amount: 0,
      },
      dialog: {
        heading: 'Removing bill item',
        message: 'Are you sure you want to remove the bill item?',
      },
      component: BillItemEditorShellComponent,
      handleSave: billItem => {
        const updatedBillItems = [...this.billItemsFromStore, billItem];
        this.billingStore.updateSlice(BillingStoreStateKeys.BillItems, updatedBillItems);
      },
      handleDelete: billItem => {
        const updatedBillItems = [...this.billItemsFromStore.filter(bi => bi.id != billItem.id)];
        this.billingStore.updateSlice(BillingStoreStateKeys.BillItems, updatedBillItems);
      }
    });
  }

  updateBillItem(billItemToUpdate) {
    this.modalService.show({
      heading: 'Update bill item',
      formData: {
        ...billItemToUpdate
      },
      dialog: {
        heading: 'Removing bill item',
        message: 'Are you sure you want to remove the bill item?',
      },
      component: BillItemEditorShellComponent,
      handleSave: billItem => {
        const updatedBillItems = [...this.billItemsFromStore, billItem];
        this.billingStore.updateSlice(BillingStoreStateKeys.BillItems, updatedBillItems);
      },
      handleDelete: billItem => {
        const updatedBillItems = [...this.billItemsFromStore.filter(bi => bi.id != billItem.id)];
        this.billingStore.updateSlice(BillingStoreStateKeys.BillItems, updatedBillItems);
      }
    });
  }
}
