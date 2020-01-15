import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'people-form[peopleForm]',
  templateUrl: './people-form.component.html',
  styleUrls: ['./people-form.component.scss']
})
export class PeopleFormComponent implements OnInit {
  @Input() peopleForm: FormGroup;

  get people() {
    return this.peopleForm.get('people') as FormArray;
  }
  constructor() { }

  ngOnInit() {
  }

}
