import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from '../person';
import { PeopleService } from '../people.service';

@Component({
  selector: 'app-person-editor',
  templateUrl: './person-editor.component.html',
  styleUrls: ['./person-editor.component.scss']
})
export class PersonEditorComponent implements OnInit {
  personForm: FormGroup;
  currentPerson: Person;
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private peeopleService: PeopleService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = +params.get('id');

      if (0 < id) {
        this.peeopleService.getPerson(id)
          .subscribe(person => {
            this.currentPerson = person;
            this.personForm = this.fb.group({
              lastname: [this.currentPerson.lastname, [Validators.required, Validators.minLength(3)]],
              firstname: [this.currentPerson.firstname, [Validators.required, Validators.minLength(3)]]
            });
          })
      } else {
        this.currentPerson = {
          id: 0,
          lastname: '',
          firstname: '',
          totalPayable: 0
        };
        this.personForm = this.fb.group({
          lastname: [this.currentPerson.lastname, [Validators.required, Validators.minLength(3)]],
          firstname: [this.currentPerson.firstname, [Validators.required, Validators.minLength(3)]]
        });
      }
    });
  }

  onSubmit() {
    if (this.personForm.invalid) {
      console.log('error!');
      return ;
    }

    const updatedPerson = {...this.currentPerson, ...this.personForm.value };
    console.log(JSON.stringify(updatedPerson));
    if (0 == this.currentPerson.id) {
      this.peeopleService.createPerson(updatedPerson)
        .subscribe(() => {
          this.redirect();
        });
    } else {
      this.peeopleService.updatePerson(updatedPerson)
        .subscribe(() => {
          this.redirect();
        })
    }
  }

  cancelEdit() {
    this.redirect();
  }

  redirect() {
    this.router.navigate(['/people']);
  }
}
