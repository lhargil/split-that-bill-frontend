import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { WizardService } from 'src/app/wizard/wizard.service';
import { takeUntil, tap, map, concatMap } from 'rxjs/operators';
import { ReplaySubject, combineLatest } from 'rxjs';
import { PeopleService } from 'src/app/people/people.service';
import { BillingStoreService, BillingStoreStateKeys } from '../billing-store.service';
import { FriendsFormComponent } from 'src/app/forms/friends-form/friends-form.component';
import { hasSelectedFriendValidator } from 'src/app/shared/validators';
import { IdGenerator } from 'src/app/shared/utilities';
import { Person } from 'src/app/people/person';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { PersonEditorShellComponent } from '../person-editor-shell/person-editor-shell.component';
import { ModalModes } from 'src/app/shared/modal/modalState';

@Component({
  selector: 'app-friends-editor-shell',
  templateUrl: './friends-editor-shell.component.html',
  styles: []
})
export class FriendsEditorShellComponent implements OnInit, OnDestroy {
  @ViewChild('friendsFormComponent') friendsFormComponent: FriendsFormComponent;

  private destroyed$ = new ReplaySubject(0);
  friendsForm: FormGroup;

  constructor(private fb: FormBuilder, private wizardService: WizardService,
    private peopleService: PeopleService, private billingStore: BillingStoreService, private dialogService: DialogService, private modalService: ModalService) {
    this.friendsForm = this.createForm([]);
  }
  wizardStep$ = this.wizardService.wizardStep$;
  friendsFromStore = [];

  ngOnInit() {
    this.billingStore.getStoreSlice$(BillingStoreStateKeys.Friends)
      .pipe(
        takeUntil(this.destroyed$),
        tap(friends => this.friendsFromStore = friends),
        map(friends => friends.map(friend => {
          return this.fb.group({
            id: [friend.id],
            firstname: [friend.firstname],
            lastname: [friend.lastname],
            fullname: [`${friend.firstname} ${friend.lastname}`],
            selected: [friend.selected]
          });
        })),
        tap(people => {
          this.friendsForm = this.createForm([]);
          const participants = this.friendsForm.get('participants') as FormArray;
          people.forEach(person => participants.push(person));
        }),
      )
      .subscribe();

    this.wizardService.nextStep$
      .pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe(nextData => {
        if (nextData == null) { return; }

        this.formSubmit(_ => nextData.next());
      });

    this.wizardService.backStep$
      .pipe(
        takeUntil(this.destroyed$),
      )
      .subscribe(backData => {
        if (backData == null) { return; }
        this.formSubmit(_ => backData.back());
      });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  addPerson() {
    this.modalService.show({
      heading: 'Add friend',
      formData: {
        ...{
          id: IdGenerator.generate(-1, -100)
        },
        firstname: '',
        lastname: '',
      },
      dialog: {
        heading: 'Removing a friend',
        message: 'Are you sure you want to remove a friend?'
      },
      modalMode: ModalModes.create,
      component: PersonEditorShellComponent,
      handleSave: (person) => {
        const friend = {
          ...person, ...{
            selected: true
          }
        };

        const updatedStore = [...this.friendsFromStore, friend];
        this.billingStore.updateSlice(BillingStoreStateKeys.Friends, updatedStore);
      }
    });
  }

  updateFriend(friend) {
    this.modalService.show({
      heading: 'Update friend',
      formData: {
        ...friend
      },
      dialog: {
        heading: 'Removing a friend',
        message: 'Are you sure you want to remove a friend?'
      },
      modalMode: ModalModes.update,
      component: PersonEditorShellComponent,
      handleSave: (person) => {
        const friend = this.friendsFromStore.find(f => f.id == person.id);

        if (!friend) {
          return;
        }
        const updatedFriend = { ...friend, ...person };
        const updatedStore = [...this.friendsFromStore.filter(f => f.id != person.id), updatedFriend];
        this.billingStore.updateSlice(BillingStoreStateKeys.Friends, updatedStore);
      },
      handleDelete: person => {
        this.billingStore.updateSlice(BillingStoreStateKeys.Friends, [...this.friendsFromStore.filter(f => f.id != person.id)]);
      }
    });
  }

  private createForm(friends: []) {
    return this.fb.group({
      participants: this.fb.array(friends)
    });
  }

  private formSubmit(callback) {
    this.friendsForm.markAllAsTouched();
    this.friendsFormComponent.changeDetectorRef.detectChanges();
    if (this.friendsForm.invalid) {
      return;
    }

    const friends = this.friendsForm.get('participants').value as Person[];
    this.billingStore.updateSlice(BillingStoreStateKeys.Friends, [...friends]);
    if (friends.length <= 0) {
      this.dialogService.info({
        heading: 'Hey',
        message: 'You have not added any friends yet. Does that mean that you didn\'t go with friends?',
        callback: affirmative => {
          if (affirmative) {
            callback();
          }
          return;
        }
      });
    } else {
      callback();
    }
  }
}
