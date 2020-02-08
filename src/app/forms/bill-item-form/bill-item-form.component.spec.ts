import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillItemFormComponent } from './bill-item-form.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('BillItemsFormComponent', () => {
  let component: BillItemFormComponent;
  let fixture: ComponentFixture<BillItemFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BillItemFormComponent],
      imports: [ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
