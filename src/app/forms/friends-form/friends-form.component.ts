import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';

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
  constructor(public changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
  }

  trackByFn(index, item) {
    return item.id;
  }
}
