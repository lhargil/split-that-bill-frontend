import { Component, OnInit, OnDestroy } from '@angular/core';
import { WizardService } from 'src/app/wizard/wizard.service';
import { BillingStoreService, BillingStoreStateKeys } from '../billing-store.service';
import { takeUntil, map, tap } from 'rxjs/operators';
import { ReplaySubject, combineLatest } from 'rxjs';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { IdGenerator } from 'src/app/shared/utilities';
import { ExtraChargeEditorShellComponent } from '../extra-charge-editor-shell/extra-charge-editor-shell.component';
import { ModalModes } from 'src/app/shared/modal/modalState';

@Component({
  selector: 'app-extra-charges-shell',
  templateUrl: './extra-charges-shell.component.html',
  styleUrls: ['./extra-charges-shell.component.scss']
})
export class ExtraChargesShellComponent implements OnInit, OnDestroy {
  private destroyed$ = new ReplaySubject(0);
  private extraChargesFromStore = [];
  constructor(private wizardService: WizardService, private billingStore: BillingStoreService, private modalService: ModalService) { }
  vm$ = combineLatest(
    [this.wizardService.wizardStep$,
    this.billingStore.getStoreSlice$(BillingStoreStateKeys.ExtraCharges),
    ]
  ).pipe(
    tap(([wizardStep, extraCharges]) => {
      this.extraChargesFromStore = extraCharges;
    }),
    map(([wizardStep, extraCharges]) => {
      return {
        wizardStep,
        extraCharges: extraCharges.map(ec => {
          return {
            ...ec,
            amount: ec.amount / 100
          };
        }),
      };
    })
  );

  ngOnInit(): void {
    this.wizardService.nextStep$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(nextData => {
        if (nextData == null) {
          return;
        }
        nextData.next();
      });

    this.wizardService.backStep$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(backData => {
        if (backData == null) {
          return;
        }
        backData.back();
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  addExtraCharge() {
    this.modalService.show({
      heading: 'Add extra charge',
      formData: {
        id: IdGenerator.generate(-1, -100),
        description: '',
        amount: 0
      },
      dialog: {
        heading: 'Removing extra charge',
        message: 'Are you sure you want to remove the extra charge?'
      },
      modalMode: ModalModes.create,
      component: ExtraChargeEditorShellComponent,
      handleSave: extraCharge => {
        const updateExtraCharges = [...this.extraChargesFromStore, extraCharge];
        this.billingStore.updateSlice(BillingStoreStateKeys.ExtraCharges, updateExtraCharges);
      },
    });
  }

  updateExtraCharge(extraChargeToUpdate) {
    this.modalService.show({
      heading: 'Update extra charge',
      formData: {
        ...extraChargeToUpdate
      },
      dialog: {
        heading: 'Removing extra charge',
        message: 'Are you sure you want to remove the extra charge?'
      },
      modalMode: ModalModes.update,
      component: ExtraChargeEditorShellComponent,
      handleSave: extraCharge => {
        this.billingStore.updateSlice(BillingStoreStateKeys.ExtraCharges,
          [...this.extraChargesFromStore.filter(ec => ec.id != extraCharge.id),
          { ...extraCharge }]);
      },
      handleDelete: extraCharge => {
        const updatedExtraCharges = [...this.extraChargesFromStore.filter(ec => ec.id != extraCharge.id)];

        this.billingStore.updateSlice(BillingStoreStateKeys.ExtraCharges, updatedExtraCharges);
      }
    });
  }
}
