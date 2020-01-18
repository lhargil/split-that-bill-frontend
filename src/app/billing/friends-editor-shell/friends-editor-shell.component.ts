import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, ValidatorFn, AbstractControl } from '@angular/forms';
import { WizardService } from 'src/app/wizard/wizard.service';
import { takeUntil, tap, map, concatMap, startWith } from 'rxjs/operators';
import { ReplaySubject, combineLatest, of } from 'rxjs';
import { WizardStep } from 'src/app/wizard/models';
import { PeopleService } from 'src/app/people/people.service';
import { BillingStoreService, BillingStoreStateKeys } from '../billing-store.service';

export function friendsWithYouValidator(minimum: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const friends = control.get('participants').value;
    const friendsSelected = friends.filter(item => item.selected);
    if (friendsSelected.length >= minimum) {
      return null;
    }
    return { 'noFriends': { value: 'You have no friends!' } };
  };
}


@Component({
  selector: 'app-friends-editor-shell',
  templateUrl: './friends-editor-shell.component.html',
  styles: []
})
export class FriendsEditorShellComponent implements OnInit, OnDestroy {
  private destroyed$ = new ReplaySubject(0);
  friendsForm: FormGroup;
  personForm: FormGroup;
  constructor(private fb: FormBuilder, private wizardService: WizardService, private peopleService: PeopleService, private billingStore: BillingStoreService) {
    this.friendsForm = this.createForm([]);
    this.personForm = this.fb.group({
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      firstname: ['', [Validators.required, Validators.minLength(3)]]
    });
  }
  wizardStep$ = this.wizardService.wizardStep$;
  friends$ = this.billingStore.storeSlice$;
  people$ = this.getPeopleObs();

  ngOnInit() {
    this.people$.subscribe();

    this.billingStore.getSlice(BillingStoreStateKeys.Friends);

    this.wizardService.nextStep$
      .pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe(nextData => {
        if (nextData == null) return;

        this.formSubmit(_ => nextData.next());
      });

    this.wizardService.backStep$
      .pipe(
        takeUntil(this.destroyed$),
      )
      .subscribe(backData => {
        if (backData == null) return;
        this.formSubmit(_ => backData.back());
      });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  getPeopleObs() {
    return combineLatest(
      this.peopleService.getPeople(),
      this.friends$
    ).pipe(
      takeUntil(this.destroyed$),
      map(([people, friends]) => people.map(person => {
        const selectedFriend = friends.find(f => f.id == person.id);
        return this.fb.group({
          id: [person.id],
          fullname: [person.fullname],
          selected: [selectedFriend && selectedFriend.selected]
        });
      })),
      tap(people => {
        this.friendsForm = this.createForm([]);
        const participants = this.friendsForm.get('participants') as FormArray;
        people.forEach(person => participants.push(person));
        this.friendsForm.setValidators(friendsWithYouValidator(1));
      })
    );
  }

  addFriend($event) {
    this.personForm.markAllAsTouched();
    if (!this.personForm.valid) {
      return;
    }

    const friend = { ...this.personForm.value };
    this.peopleService.createPerson(friend)
      .pipe(
        takeUntil(this.destroyed$),
        concatMap(_ => this.getPeopleObs())
      ).subscribe();
  }

  private createForm(friends: []) {
    return this.fb.group({
      participants: this.fb.array(friends)
    });
  }

  private formSubmit(callback) {
    this.friendsForm.markAllAsTouched();
    if (!this.friendsForm.valid) {
      return;
    }

    const friends = this.friendsForm.get('participants').value.filter(item => item.selected);

    this.billingStore.updateSlice(BillingStoreStateKeys.Friends, [...friends]);

    callback();
  }
}
