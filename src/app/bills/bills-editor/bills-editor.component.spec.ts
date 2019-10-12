import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsEditorComponent } from './bills-editor.component';

describe('BillsEditorComponent', () => {
  let component: BillsEditorComponent;
  let fixture: ComponentFixture<BillsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
