import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WizardService } from 'src/app/wizard/wizard.service';
import { PeopleService } from 'src/app/people/people.service';
import { ReplaySubject } from 'rxjs';
import { takeUntil, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-person-editor-shell',
  templateUrl: './person-editor-shell.component.html',
  styles: []
})
export class PersonEditorShellComponent implements OnInit, OnDestroy {
  private destroyed$ = new ReplaySubject(0);
  personForm: FormGroup;
  constructor(private fb: FormBuilder, private wizardService: WizardService, private peopleService: PeopleService) {
    this.personForm = this.fb.group({
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      firstname: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit() {
    this.peopleService.getPerson(1)
      .pipe(
        tap(console.log),
        takeUntil(this.destroyed$),
        map(person => {
          return this.personForm.patchValue({
            lastname: person.lastname,
            firstname: person.firstname
          });
        })
      )
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

  formSubmit(callback: (data) => void) {
    this.personForm.markAllAsTouched();
    if (!this.personForm.valid) {
      return;
    }

    const updatedPerson = { ...this.personForm.value };

    console.log(updatedPerson);

    // this.wizardService.confirmGoNext({});
    callback(this.personForm);
  }
}
