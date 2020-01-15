import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraChargesEditorShellComponent } from './extra-charges-editor-shell.component';

describe('ExtraChargesEditorShellComponent', () => {
  let component: ExtraChargesEditorShellComponent;
  let fixture: ComponentFixture<ExtraChargesEditorShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtraChargesEditorShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraChargesEditorShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
