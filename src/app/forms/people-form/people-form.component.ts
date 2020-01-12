import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'people-form[peopleForm]',
  templateUrl: './people-form.component.html',
  styleUrls: ['./people-form.component.scss']
})
export class PeopleFormComponent implements OnInit {
  @Input() peopleForm: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
