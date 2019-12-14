import { Component, OnInit } from '@angular/core';
import { BillsService } from 'src/app/bills/bills.service';
import { BillDto } from 'src/app/bills/bills';
import { Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
import { BillsEditorComponent } from 'src/app/bills/bills-editor/bills-editor.component';

@Component({
  selector: 'app-billing-list',
  templateUrl: './billing-list.component.html',
  styleUrls: ['./billing-list.component.scss']
})
export class BillingListComponent implements OnInit {

  constructor(private billsService: BillsService) { }
  bills$ = this.billsService.getBills();
  ngOnInit() { }
}
