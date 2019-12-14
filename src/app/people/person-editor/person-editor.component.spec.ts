import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonEditorComponent } from './person-editor.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PeopleService } from '../people.service';
import { PeopleMockService } from '../stub/people-mock.service';

describe('PersonEditorComponent', () => {
  let component: PersonEditorComponent;
  let fixture: ComponentFixture<PersonEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonEditorComponent],
      providers: [
        { provide: PeopleService, useClass: PeopleMockService }
      ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
