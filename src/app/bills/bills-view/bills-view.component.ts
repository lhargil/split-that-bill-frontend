import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BillsService } from '../bills.service';
import { Observable, combineLatest } from 'rxjs';
import { BillDto } from '../bills';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { BillingService } from 'src/app/billing/billing.service';

@Component({
  selector: 'app-bills-view',
  templateUrl: './bills-view.component.html',
  styleUrls: ['./bills-view.component.scss']
})
export class BillsViewComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private billsService: BillsService,
    private billingService: BillingService,
    private router: Router) { }
    
  vm$ = this.activatedRoute.paramMap
    .pipe(
      switchMap(params => this.billsService.getBill(+params.get('id')))
    );
  ngOnInit() {}

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this bill?')) {
      this.billsService.deleteBill(id)
        .subscribe(result => this.redirect());      
    }
  }

  getChargePrice(rate: number, total: number) {
    return total * rate;
  }

  redirect() {
    this.router.navigate(['/bills']);
  }

  onCancel() {
    this.redirect();
  }
}
