import { Component, OnInit, OnDestroy } from '@angular/core';
import { BillingStoreService } from '../billing-store.service';
import { ReplaySubject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { WizardService } from 'src/app/wizard/wizard.service';

@Component({
  selector: 'app-receipt-shell',
  templateUrl: './receipt-shell.component.html',
  styles: []
})
export class ReceiptShellComponent implements OnInit, OnDestroy {
  private destroyed$ = new ReplaySubject(0);
  constructor(private billingStore: BillingStoreService, private wizardService: WizardService) { }

  receipt$ = this.billingStore.store$.pipe(tap(console.log));

  ngOnInit() {
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
