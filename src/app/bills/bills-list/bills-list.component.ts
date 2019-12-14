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

  bills$ = this.billsService.getBills();

  ngOnInit() {
  }

}
