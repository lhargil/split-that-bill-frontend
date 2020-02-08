import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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
  @Input() formData: any;
  private destroyed$ = new ReplaySubject(0);
  personForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.personForm = this.fb.group({
      id: [''],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      firstname: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit() {
    this.personForm.patchValue(this.formData);
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
    callback(updatedPerson);
  }
}
