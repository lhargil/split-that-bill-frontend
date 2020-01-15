import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraChargesFormComponent } from './extra-charges-form.component';

describe('ExtraChargesFormComponent', () => {
  let component: ExtraChargesFormComponent;
  let fixture: ComponentFixture<ExtraChargesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtraChargesFormComponent ]
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
