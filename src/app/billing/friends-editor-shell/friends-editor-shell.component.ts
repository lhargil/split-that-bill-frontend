import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { WizardService } from 'src/app/wizard/wizard.service';
import { takeUntil, tap, map, concatMap } from 'rxjs/operators';
import { ReplaySubject, Observable } from 'rxjs';
import { WizardStep } from 'src/app/wizard/models';
import { PeopleService } from 'src/app/people/people.service';

@Component({
  selector: 'app-friends-editor-shell',
  templateUrl: './friends-editor-shell.component.html',
  styles: []
})
export class FriendsEditorShellComponent implements OnInit, OnDestroy {
  private destroyed$ = new ReplaySubject(0);
  friendsForm: FormGroup;
  personForm: FormGroup;
  constructor(private fb: FormBuilder, private wizardService: WizardService, private peopleService: PeopleService) {
    this.friendsForm = this.fb.group({
      participants: this.fb.array([{
        id: 1,
        fullname: 'lhar gil',
        selected: false
      }].map(p => {
        return this.fb.group({
          id: [p.id],
          fullname: [p.fullname],
          selected: [p.selected]
        });
      }))
    });
    this.personForm = this.fb.group({
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      firstname: ['', [Validators.required, Validators.minLength(3)]]
    });
  }
  wizardStep$ = this.wizardService.wizardStep$;
  people$ = this.getPeopleObs();

  ngOnInit() {
    this.people$
      .subscribe();
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
    return this.peopleService.getPeople()
      .pipe(
        takeUntil(this.destroyed$),
        map(people => people.map(person => {
          return this.fb.group({
            id: [person.id],
            fullname: [person.fullname],
            selected: [false]
          });
        })),
        tap(people => {
          const participants = this.friendsForm.get('participants') as FormArray;
          participants.clear();
          people.forEach(person => participants.push(person));
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

  private formSubmit(callback) {
    callback();
  }
}
