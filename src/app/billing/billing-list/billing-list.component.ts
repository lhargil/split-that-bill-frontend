import { Component, OnInit } from '@angular/core';
import { BillsService } from 'src/app/bills/bills.service';
import { BillDto } from 'src/app/bills/bills';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-billing-list',
  templateUrl: './billing-list.component.html',
  styleUrls: ['./billing-list.component.scss']
})
export class BillingListComponent implements OnInit {

  constructor(private billsService: BillsService) { }
  bills$: Observable<BillDto[]>;
  ngOnInit() {
    this.bills$ = this.billsService.getBills();
  }
}
