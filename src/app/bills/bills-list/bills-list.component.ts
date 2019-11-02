import { Component, OnInit } from '@angular/core';
import { BillsService } from '../bills.service';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-bills-list',
  templateUrl: './bills-list.component.html',
  styleUrls: ['./bills-list.component.scss']
})
export class BillsListComponent implements OnInit {
  constructor(private billsService: BillsService) { }
  
  private currentUser = 1;
  bills$ = this.billsService.getBills()
      .pipe(
        map(bills => bills.filter(bill => bill.participants.filter(p => p.person.id == this.currentUser).length > 0))
      );

  ngOnInit() {
  }

}
