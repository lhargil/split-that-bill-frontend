import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillFormComponent } from './bill-form.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('BillFormComponent', () => {
  let component: BillFormComponent;
  let fixture: ComponentFixture<BillFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BillFormComponent],
      imports: [ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
