import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, switchMap, map, combineAll, tap, concatMap } from 'rxjs/operators';
import { Subject, merge, zip, of } from 'rxjs';
import { BillsService } from '../bills/bills.service';
import { BillingService } from '../billing/billing.service';
import { NotificationService } from '../notification/notification.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject();
  isBrowser: boolean;
  constructor(private activatedRoute: ActivatedRoute,
    private billsService: BillsService, private billingService: BillingService, private notificationService: NotificationService, @Inject(PLATFORM_ID) platformId: any) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  receipt$ = this.activatedRoute.params
    .pipe(
      switchMap(params =>
        this.billsService.getBillByGuid(params.id)
      ),
      concatMap(bill => {
        return zip(
          of(bill),
          this.billingService.getBillings(bill.id),
        );
      }),
      map(([bill, billing]) => {
        return {
          friends: bill.participants.map(p => {
            return {
              id: p.person.id,
              firstname: p.person.firstname,
              lastname: p.person.lastname,
              fullname: p.person.fullname
            };
          }),
          bill: {
            establishmentName: bill.establishmentName,
            billDate: new Date(bill.billDate),
            remarks: bill.remarks,
            currency: bill.currency
          },
          extraCharges: bill.extraCharges.map(ec => {
            return {
              ...ec,
              amount: ec.rate * 100,
            };
          }),
          billItems: bill.billItems.map(bi => {
            return {
              ...bi,
              amount: bi.unitPrice.amount
            };
          }),
          personBillItems: billing.peopleBilling.map(pb => {
            return {
              itemId: pb.billItem.id,
              assignee: (pb.person && pb.person.id) || null
            };
          })
        };
      })
    );

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onShare() {
    const copiedUrl = this.isBrowser ? window.location.href : '';
    this.copyMessage(copiedUrl);
    this.notificationService.info({
      header: 'Url copied',
      message: 'The receipt url has been copied to your clipboard.'
    });
  }

  private copyMessage(val: string) {
    if (this.isBrowser) {
      const selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = val;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);
    }
  }
}
