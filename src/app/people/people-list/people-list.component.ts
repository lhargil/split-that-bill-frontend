import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../people.service';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit {

  constructor(private peopleService: PeopleService) { }
  people$ = this.peopleService.getPeople();
  ngOnInit() {
  }

}
