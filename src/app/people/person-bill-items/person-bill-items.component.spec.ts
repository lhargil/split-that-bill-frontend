import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonBillItemsComponent } from './person-bill-items.component';

describe('PersonBillItemsComponent', () => {
  let component: PersonBillItemsComponent;
  let fixture: ComponentFixture<PersonBillItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonBillItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonBillItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
