import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BillsService } from '../bills.service';
import { Observable } from 'rxjs';
import { BillDto } from '../bills';

@Component({
  selector: 'app-bills-view',
  templateUrl: './bills-view.component.html',
  styleUrls: ['./bills-view.component.scss']
})
export class BillsViewComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private billsService: BillsService,
    private router: Router) { }
  bill$: Observable<BillDto>;
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(param => {
      const id = +param.get('id');

      this.bill$ = this.billsService.getBill(id);
    });
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this bill?')) {
      this.billsService.deleteBill(id)
        .subscribe(result => this.redirect());      
    }
  }

  redirect() {
    this.router.navigate(['/bills']);
  }
}
