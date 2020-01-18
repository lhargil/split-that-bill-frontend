import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'friends-form[friendsForm]',
  templateUrl: './friends-form.component.html',
  styleUrls: ['./friends-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FriendsFormComponent implements OnInit {
  @Input() friendsForm: FormGroup;

  get participants() {
    return this.friendsForm.get('participants') as FormArray;
  }
  constructor() { }

  ngOnInit() {
  }

  trackByFn(index, item) {
    return item.id;
  }
}
