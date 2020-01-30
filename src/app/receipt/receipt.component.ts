import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, switchMap, map, combineAll, tap, concatMap } from 'rxjs/operators';
import { Subject, merge, zip, of } from 'rxjs';
import { BillsService } from '../bills/bills.service';
import { BillingService } from '../billing/billing.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject();
  constructor(private activatedRoute: ActivatedRoute,
    private billsService: BillsService, private billingService: BillingService) { }

  receipt$ = this.activatedRoute.params
    .pipe(
      tap(console.log),
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
            remarks: bill.remarks
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
}
