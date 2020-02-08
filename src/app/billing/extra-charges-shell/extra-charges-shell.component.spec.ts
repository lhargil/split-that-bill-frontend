import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraChargesShellComponent } from './extra-charges-shell.component';

describe('ExtraChargesShellComponent', () => {
  let component: ExtraChargesShellComponent;
  let fixture: ComponentFixture<ExtraChargesShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtraChargesShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraChargesShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
