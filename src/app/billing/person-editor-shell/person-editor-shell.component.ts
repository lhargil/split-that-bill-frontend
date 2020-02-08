import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-person-editor-shell',
  templateUrl: './person-editor-shell.component.html',
  styles: []
})
export class PersonEditorShellComponent implements OnInit {
  @Input() formData: any;
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

  formSubmit(callback: (data) => void) {
    this.personForm.markAllAsTouched();
    if (!this.personForm.valid) {
      return;
    }

    const updatedPerson = { ...this.personForm.value };
    callback(updatedPerson);
  }
}
