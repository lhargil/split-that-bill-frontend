import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'friends-form[friendsForm]',
  templateUrl: './friends-form.component.html',
  styleUrls: ['./friends-form.component.scss']
})
export class FriendsFormComponent implements OnInit {
  @Input() friendsForm: FormGroup;

  get participants() {
    return this.friendsForm.get('participants') as FormArray;
  }
  constructor() { }

  ngOnInit() {
  }

}
