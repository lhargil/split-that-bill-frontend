import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { WizardService } from 'src/app/wizard/wizard.service';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-bill-items-assign-editor-shell',
  templateUrl: './bill-items-assign-editor-shell.component.html',
  styles: []
})
export class BillItemsAssignEditorShellComponent implements OnInit, OnDestroy {
  private destroyed$ = new ReplaySubject(0);
  billItemsForm: FormGroup;
  constructor(private wizardService: WizardService, private fb: FormBuilder) {
    this.billItemsForm = this.fb.group({
      billItems: this.fb.array([this.fb.group({
        itemId: [0],
        itemDescription: ['Nasi lemak'],
        amount: [0],
        currency: ['MYR'],
        priceWithCharges: [0],
        assignee: [0]
      }), this.fb.group({
        itemId: [0],
        itemDescription: ['Juice'],
        amount: [0],
        currency: ['MYR'],
        priceWithCharges: [0],
        assignee: [0]
      })])
    });
  }

  ngOnInit() {
    this.wizardService.nextStep$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(nextData => {
        if (nextData == null) return;
        this.formSubmitted(_ => nextData.next());
      });

    this.wizardService.backStep$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(backData => {
        if (backData == null) return;
        this.formSubmitted(_ => backData.back());
      });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  private formSubmitted(callback) {
    callback();
  }
}
