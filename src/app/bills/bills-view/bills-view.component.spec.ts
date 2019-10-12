import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsViewComponent } from './bills-view.component';

describe('BillsViewComponent', () => {
  let component: BillsViewComponent;
  let fixture: ComponentFixture<BillsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
