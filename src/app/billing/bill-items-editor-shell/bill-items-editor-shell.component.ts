import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { decimalAmountValidator } from 'src/app/shared/validators/decimal-amount.directive';
import { ReplaySubject } from 'rxjs';
import { WizardService } from 'src/app/wizard/wizard.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-bill-items-editor-shell',
  templateUrl: './bill-items-editor-shell.component.html',
  styles: []
})
export class BillItemsEditorShellComponent implements OnInit, OnDestroy {
  private destroyed$ = new ReplaySubject(0);
  billItemsForm: FormGroup;
  constructor(private fb: FormBuilder, private wizardService: WizardService) {
    this.billItemsForm = this.fb.group({
      billItems: this.fb.array([this.fb.group({
        id: [0],
        description: ['', [Validators.required, Validators.minLength]],
        amount: [Number(0).toFixed(2), [Validators.required, decimalAmountValidator()]],
        discount: [null, [decimalAmountValidator(true)]]
      })]),
    });
  }

  wizardStep$ = this.wizardService.wizardStep$;

  ngOnInit() {
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

  private formSubmit(callback) {
    callback();
  }
}
