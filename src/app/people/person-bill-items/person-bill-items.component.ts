import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../people.service';
import { PersonBillItems } from '../person';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-person-bill-items',
  templateUrl: './person-bill-items.component.html',
  styleUrls: ['./person-bill-items.component.scss']
})
export class PersonBillItemsComponent implements OnInit {

  constructor(private peopleService: PeopleService,
    private activatedRoute: ActivatedRoute) { }
  personBillItems$: Observable<PersonBillItems>
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = +params.get('id');

      this.personBillItems$ = this.peopleService.getPersonBillItems(id);
    });
  }

}
