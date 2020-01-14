import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { decimalAmountValidator } from 'src/app/shared/validators/decimal-amount.directive';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WizardService } from 'src/app/wizard/wizard.service';

@Component({
  selector: 'app-bill-editor-shell',
  templateUrl: './bill-editor-shell.component.html',
  styles: []
})
export class BillEditorShellComponent implements OnInit, OnDestroy {
  private destroyed$ = new ReplaySubject(0);
  billForm: FormGroup;
  constructor(private fb: FormBuilder, private wizardService: WizardService) {
    this.billForm = this.fb.group({
      establishmentName: ['',
        [
          Validators.required,
          Validators.minLength(3)
        ]],
      billDateYear: [2020, [Validators.required]],
      billDateMonth: [1, [Validators.required]],
      billDateDay: [1, [Validators.required]],
      remarks: [''],
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
      .pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe(nextData => {
        if (nextData == null) return;
        this.formSubmit(_ => nextData.next());
      });
    this.wizardService.backStep$
      .pipe(
        takeUntil(this.destroyed$),
      )
      .subscribe(backData => {
        if (backData == null) return;
        this.formSubmit(_ => backData.back());
      });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  private formSubmit(callback) {
    callback();
  }
}
