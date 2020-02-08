import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillItemsShellComponent } from './bill-items-shell.component';

describe('BillItemsShellComponent', () => {
  let component: BillItemsShellComponent;
  let fixture: ComponentFixture<BillItemsShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillItemsShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillItemsShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
