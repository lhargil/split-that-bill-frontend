import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptShellComponent } from './receipt-shell.component';

describe('ReceiptShellComponent', () => {
  let component: ReceiptShellComponent;
  let fixture: ComponentFixture<ReceiptShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
