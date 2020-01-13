import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillItemsAssignFormComponent } from './bill-items-assign-form.component';

describe('BillItemsAssignFormComponent', () => {
  let component: BillItemsAssignFormComponent;
  let fixture: ComponentFixture<BillItemsAssignFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillItemsAssignFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillItemsAssignFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
