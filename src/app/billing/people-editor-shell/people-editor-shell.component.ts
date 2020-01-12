import { Component, OnInit, OnDestroy } from '@angular/core';
import { PeopleService } from 'src/app/people/people.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { takeUntil, map, tap } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { WizardService } from 'src/app/wizard/wizard.service';

@Component({
  selector: 'app-people-editor-shell',
  templateUrl: './people-editor-shell.component.html',
  styles: []
})
export class PeopleEditorShellComponent implements OnInit, OnDestroy {
  private destroyed$ = new ReplaySubject(0);
  peopleForm: FormGroup;
  constructor(private fb: FormBuilder, private peopleService: PeopleService, private wizardService: WizardService) {
    this.peopleForm = this.fb.group({
      people: this.fb.array([this.fb.group({
        id: [''],
        lastname: ['lastname', [Validators.required, Validators.minLength(3)]],
        firstname: ['firstname', [Validators.required, Validators.minLength(3)]]
      })]),
      participants: this.fb.array([{
        id: 1,
        fullname: 'lhar gil',
        selected: true,
        bpId: 1
      }].map(p => {
        return this.fb.group({
          id: [p.id],
          fullname: [p.fullname],
          selected: [p.selected],
          bpId: [p.bpId]
        });
      }))
    });
  }

  ngOnInit() {
    this.peopleService.getPeople()
      .pipe(
        takeUntil(this.destroyed$),
        map(people => {
          return people.map(person => this.fb.group({
            id: [person.id],
            lastname: [person.lastname, [Validators.required, Validators.minLength(3)]],
            firstname: [person.firstname, [Validators.required, Validators.minLength(3)]]
          }));
        }),
      ).subscribe(peopleArray => {
        const p = this.peopleForm.get('people') as FormArray;
        p.removeAt(0);
        peopleArray.forEach(person => p.push(person));
      });
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

  private formSubmit(callback) {
    callback();
  }
}
