import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonBillItemsComponent } from './person-bill-items.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PeopleService } from '../people.service';
import { PeopleMockService } from '../stub/people-mock.service';

describe('PersonBillItemsComponent', () => {
  let component: PersonBillItemsComponent;
  let fixture: ComponentFixture<PersonBillItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonBillItemsComponent ],
      providers: [
        { provide: PeopleService, useClass: PeopleMockService }
      ],
      imports: [
        RouterTestingModule
      ]
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
