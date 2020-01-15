import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillItemsFormComponent } from './bill-items-form.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('BillItemsFormComponent', () => {
  let component: BillItemsFormComponent;
  let fixture: ComponentFixture<BillItemsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BillItemsFormComponent],
      imports: [ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillItemsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
