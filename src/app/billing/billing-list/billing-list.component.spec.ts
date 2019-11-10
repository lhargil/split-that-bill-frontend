import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingListComponent } from './billing-list.component';
import { BillsService } from 'src/app/bills/bills.service';
import { Observable, of, from } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { BillsMockService } from 'src/app/bills/stub/bills-mock.service';

describe('BillingListComponent', () => {
  let component: BillingListComponent;
  let fixture: ComponentFixture<BillingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingListComponent ],
      providers: [
        { provide: BillsService, useClass: BillsMockService }
      ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
