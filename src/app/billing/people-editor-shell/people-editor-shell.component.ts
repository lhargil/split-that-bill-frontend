import { Component, OnInit } from '@angular/core';
import { PeopleService } from 'src/app/people/people.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-people-editor-shell',
  templateUrl: './people-editor-shell.component.html',
  styles: []
})
export class PeopleEditorShellComponent implements OnInit {
  private destroyed$ = new ReplaySubject(0);
  peopleForm: FormGroup;
  constructor(private fb: FormBuilder, private peopleService: PeopleService) {
    this.peopleForm = this.fb.group({
      people: this.fb.array([
        this.fb.group({
          lastname: ['a', [Validators.required, Validators.minLength(3)]],
          firstname: ['b', [Validators.required, Validators.minLength(3)]]
        })
      ])
    });
  }

  ngOnInit() {
    // this.peopleService.getPeople()
    //   .pipe(
    //     takeUntil(this.destroyed$),
    //     map(people )
    //   )
  }

}
