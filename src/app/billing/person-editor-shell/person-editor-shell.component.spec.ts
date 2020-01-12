import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonEditorShellComponent } from './person-editor-shell.component';

describe('PersonEditorShellComponent', () => {
  let component: PersonEditorShellComponent;
  let fixture: ComponentFixture<PersonEditorShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonEditorShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonEditorShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
