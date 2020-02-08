import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, Output } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'friends-form[friendsForm]',
  templateUrl: './friends-form.component.html',
  styleUrls: ['./friends-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FriendsFormComponent implements OnInit {
  @Input() friendsForm: FormGroup;
  @Output() updateFriendClicked: EventEmitter<any>;

  get participants() {
    return this.friendsForm.get('participants') as FormArray;
  }
  constructor(public changeDetectorRef: ChangeDetectorRef) {
    this.updateFriendClicked = new EventEmitter<any>();
  }

  ngOnInit() {
  }

  trackByFn(index, item) {
    return item.id;
  }

  update(friend) {
    this.updateFriendClicked.emit(friend.value);
  }
}
