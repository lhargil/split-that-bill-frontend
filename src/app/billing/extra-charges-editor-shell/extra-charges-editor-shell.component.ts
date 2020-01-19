import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { WizardService } from 'src/app/wizard/wizard.service';
import { decimalAmountValidator } from 'src/app/shared/validators/decimal-amount.directive';
import { ReplaySubject } from 'rxjs';
import { takeUntil, map, tap } from 'rxjs/operators';
import { ExtraChargesFormComponent } from 'src/app/forms/extra-charges-form/extra-charges-form.component';
import { BillingStoreService, BillingStoreStateKeys } from '../billing-store.service';

@Component({
  selector: 'app-extra-charges-editor-shell',
  templateUrl: './extra-charges-editor-shell.component.html',
  styles: []
})
export class ExtraChargesEditorShellComponent implements OnInit, OnDestroy {
  @ViewChild('extraChargesFormComponent', { static: false }) extraChargesFormComponent: ExtraChargesFormComponent;

  private destroyed$ = new ReplaySubject(0);

  extraChargesForm: FormGroup;

  get extraCharges() {
    return this.extraChargesForm.get('extraCharges') as FormArray;
  }

  constructor(private wizardService: WizardService, private fb: FormBuilder, private billingStore: BillingStoreService) {
    this.extraChargesForm = this.createForm([]);
  }

  wizardStep$ = this.wizardService.wizardStep$;

  ngOnInit() {
    this.billingStore.getStoreSlice$(BillingStoreStateKeys.ExtraCharges).pipe(
      takeUntil(this.destroyed$),
      tap(extraCharges => {
        this.extraChargesForm = this.createForm(extraCharges || []);
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

  addExtraCharge(index: number) {
    this.extraCharges.push(this.buildExtraCharge({
      id: index,
      description: '',
      rate: 0
    }));
  }

  removeExtraCharge(index: number) {
    this.extraCharges.removeAt(index);
  }

  private createForm(charges) {
    return this.fb.group({
      extraCharges: this.fb.array(charges.map(ec => {
        return this.buildExtraCharge(ec);
      })),
    });
  }

  private formSubmit(callback) {
    this.extraChargesForm.markAllAsTouched();
    this.extraChargesFormComponent.changeDetectorRef.detectChanges();
    if (!this.extraChargesForm.valid) {
      return;
    }

    const charges = [...this.extraChargesForm.get('extraCharges').value];

    this.billingStore.updateSlice(BillingStoreStateKeys.ExtraCharges, charges);

    callback();
  }

  private buildExtraCharge(extraCharge: { id: number, description: string, rate: number }) {
    return this.fb.group({
      id: [extraCharge.id],
      description: [extraCharge.description, [Validators.required, Validators.minLength]],
      rate: [extraCharge.rate, [Validators.required, decimalAmountValidator()]]
    });
  }
}
