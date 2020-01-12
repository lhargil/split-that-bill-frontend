import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillEditorShellComponent } from './bill-editor-shell.component';

describe('BillEditorShellComponent', () => {
  let component: BillEditorShellComponent;
  let fixture: ComponentFixture<BillEditorShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillEditorShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillEditorShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
