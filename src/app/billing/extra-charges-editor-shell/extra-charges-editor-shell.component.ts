import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { WizardService } from 'src/app/wizard/wizard.service';
import { decimalAmountValidator } from 'src/app/shared/validators/decimal-amount.validator';
import { ReplaySubject } from 'rxjs';
import { takeUntil, map, tap } from 'rxjs/operators';
import { ExtraChargesFormComponent } from 'src/app/forms/extra-charges-form/extra-charges-form.component';
import { BillingStoreService, BillingStoreStateKeys } from '../billing-store.service';
import { ExtraChargesManager } from '../models/extra-charges-manager';
import { ExtraCharge } from '../models';

@Component({
  selector: 'app-extra-charges-editor-shell',
  templateUrl: './extra-charges-editor-shell.component.html',
  styles: []
})
export class ExtraChargesEditorShellComponent implements OnInit, OnDestroy {
  @ViewChild('extraChargesFormComponent') extraChargesFormComponent: ExtraChargesFormComponent;

  private destroyed$ = new ReplaySubject(0);
  private extraChargesManager: ExtraChargesManager;
  private extraChargesList: ExtraCharge[];

  get extraChargesForm() {
    return this.extraChargesManager.extraChargesForm;
  }

  get extraCharges() {
    return this.extraChargesForm.get('extraCharges') as FormArray;
  }

  constructor(private wizardService: WizardService, private fb: FormBuilder, private billingStore: BillingStoreService) {
    this.extraChargesList = [];
    this.extraChargesManager = new ExtraChargesManager(fb, this.extraChargesList);
    this.extraChargesManager.createForm();
  }

  wizardStep$ = this.wizardService.wizardStep$;

  ngOnInit() {
    this.billingStore.getStoreSlice$(BillingStoreStateKeys.ExtraCharges).pipe(
      takeUntil(this.destroyed$),
      tap(extraCharges => {
        this.extraChargesManager.populateList(extraCharges || []);
        this.extraChargesManager.createForm();
      })
    ).subscribe();

    this.wizardService.nextStep$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(nextData => {
        if (nextData == null) {
          return;
        }
        this.formSubmit(_ => nextData.next());
      });

    this.wizardService.backStep$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(backData => {
        if (backData == null) {
          return;
        }
        this.formSubmit(_ => backData.back());
      });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  addExtraCharge() {
    this.extraChargesManager.addExtraCharge();
  }

  removeExtraCharge(index: number) {
    this.extraChargesManager.removeExtraCharge(index);
  }

  private formSubmit(callback) {
    this.extraChargesForm.markAllAsTouched();
    this.extraChargesFormComponent.changeDetectorRef.detectChanges();
    if (!this.extraChargesForm.valid) {
      return;
    }

    const updatedExtraCharges = [...this.extraCharges.value];

    this.billingStore.updateSlice(BillingStoreStateKeys.ExtraCharges, updatedExtraCharges);

    callback();
  }
}
