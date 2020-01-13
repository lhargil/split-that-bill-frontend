import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillItemsAssignEditorShellComponent } from './bill-items-assign-editor-shell.component';

describe('BillItemsAssignEditorShellComponent', () => {
  let component: BillItemsAssignEditorShellComponent;
  let fixture: ComponentFixture<BillItemsAssignEditorShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillItemsAssignEditorShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillItemsAssignEditorShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
