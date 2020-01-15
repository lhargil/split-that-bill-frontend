import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleEditorShellComponent } from './people-editor-shell.component';
import { FormsModule } from 'src/app/forms/forms.module';

describe('PeopleEditorShellComponent', () => {
  let component: PeopleEditorShellComponent;
  let fixture: ComponentFixture<PeopleEditorShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PeopleEditorShellComponent],
      imports: [FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleEditorShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
