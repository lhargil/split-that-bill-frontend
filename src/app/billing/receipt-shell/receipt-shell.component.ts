import { Component, OnInit, OnDestroy } from '@angular/core';
import { BillingStoreService } from '../billing-store.service';
import { ReplaySubject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { WizardService } from 'src/app/wizard/wizard.service';
import { BillingData } from '../billing';

@Component({
  selector: 'app-receipt-shell',
  templateUrl: './receipt-shell.component.html',
  styles: []
})
export class ReceiptShellComponent implements OnInit, OnDestroy {
  private destroyed$ = new ReplaySubject(0);
  receipt: BillingData;
  constructor(private billingStore: BillingStoreService, private wizardService: WizardService) { }

  wizard$ = this.wizardService.wizardStep$;

  ngOnInit() {
    this.billingStore.store$
      .pipe(
        tap(store => this.receipt = store),
        takeUntil(this.destroyed$)
      )
      .subscribe();
    this.wizardService.nextStep$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(nextData => nextData.next());

    this.wizardService.backStep$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(backData => backData.back());
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
