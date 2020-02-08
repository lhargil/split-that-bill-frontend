import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraChargesFormComponent } from './extra-charge-form.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('ExtraChargesFormComponent', () => {
  let component: ExtraChargeFormComponent;
  let fixture: ComponentFixture<ExtraChargeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExtraChargesFormComponent],
      imports: [ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraChargesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
