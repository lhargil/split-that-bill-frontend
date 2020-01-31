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

@Component({
  selector: 'app-friends-editor-shell',
  templateUrl: './friends-editor-shell.component.html',
  styles: []
})
export class FriendsEditorShellComponent implements OnInit, OnDestroy {
  @ViewChild('friendsFormComponent', { static: false }) friendsFormComponent: FriendsFormComponent;

  private destroyed$ = new ReplaySubject(0);
  friendsForm: FormGroup;
  personForm: FormGroup;
  hidePersonForm: boolean;

  constructor(private fb: FormBuilder, private wizardService: WizardService,
    private peopleService: PeopleService, private billingStore: BillingStoreService) {
    this.friendsForm = this.createForm([]);
    this.personForm = this.fb.group({
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      firstname: ['', [Validators.required, Validators.minLength(3)]]
    });
    this.hidePersonForm = true;
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
          this.friendsForm.setValidators(hasSelectedFriendValidator(1));
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

  addFriend() {
    this.personForm.markAllAsTouched();
    if (!this.personForm.valid) {
      return;
    }

    const friend = {
      ...this.personForm.value, ...{
        id: IdGenerator.generate(-1, -100)
      }
    };

    const updatedStore = [...this.friendsFromStore, friend];
    console.log(updatedStore);
    this.billingStore.updateSlice(BillingStoreStateKeys.Friends, updatedStore);
    this.personForm.reset();
  }

  closeAddPersonForm() {
    this.hidePersonForm = true;
  }

  openAddPersonForm() {
    this.hidePersonForm = false;
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

    const friends = this.friendsForm.get('participants').value;

    this.billingStore.updateSlice(BillingStoreStateKeys.Friends, [...friends]);

    callback();
  }
}
