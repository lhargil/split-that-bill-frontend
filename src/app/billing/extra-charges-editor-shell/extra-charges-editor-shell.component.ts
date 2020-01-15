import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { WizardService } from 'src/app/wizard/wizard.service';
import { decimalAmountValidator } from 'src/app/shared/validators/decimal-amount.directive';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-extra-charges-editor-shell',
  templateUrl: './extra-charges-editor-shell.component.html',
  styles: []
})
export class ExtraChargesEditorShellComponent implements OnInit, OnDestroy {
  private destroyed$ = new ReplaySubject(0);

  extraChargesForm: FormGroup;

  get extraCharges() {
    return this.extraChargesForm.get('extraCharges') as FormArray;
  }

  constructor(private wizardService: WizardService, private fb: FormBuilder) {
    this.extraChargesForm = this.fb.group({
      extraCharges: this.fb.array([this.fb.group({
        id: [0],
        description: ['', [Validators.required, Validators.minLength]],
        rate: [0, [Validators.required, decimalAmountValidator()]]
      })]),
    });
  }

  wizardStep$ = this.wizardService.wizardStep$;

  ngOnInit() {
    this.wizardService.nextStep$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(nextData => {
        if (nextData == null) {
          return;
        }
        this.formSubmit(nextData.next());
      });

    this.wizardService.backStep$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(backData => {
        if (backData == null) {
          return;
        }
        this.formSubmit(backData.back());
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
      amount: 0
    }));
  }

  removeExtraCharge(index: number) {
    this.extraCharges.removeAt(index);

    const extraChargesIsEmpty = this.extraCharges.length <= 0;
    if (extraChargesIsEmpty) {
      this.addExtraCharge(0);
    }
  }

  private formSubmit(callback) {
    if (!this.extraChargesForm.valid) {
      return;
    }

    console.log(console.table(this.extraChargesForm.value));
    callback();
  }

  private buildExtraCharge(extraCharge: { id: number, description: string, amount: number }) {
    return this.fb.group({
      id: [extraCharge.id],
      description: [extraCharge.description, [Validators.required, Validators.minLength]],
      rate: [extraCharge.amount, [Validators.required, decimalAmountValidator()]]
    });
  }
}
