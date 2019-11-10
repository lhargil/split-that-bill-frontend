import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingPaymentComponent } from './billing-payment.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { of, Observable, from } from 'rxjs';
import { BillingService } from '../billing.service';
import { RouterTestingModule } from '@angular/router/testing';

class BillingMockService {
  updatePersonBilling(): Observable<any> {
    return of({});
  }
  getPersonBilling(): Observable<any> {
    return of({});
  }
  getBillings(): Observable<any> {
    return from([]);
  }
}

describe('BillingPaymentComponent', () => {
  let component: BillingPaymentComponent;
  let fixture: ComponentFixture<BillingPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingPaymentComponent ],
      providers: [
        { provide: BillingService, useClass: BillingMockService }
      ],
      imports: [
        BrowserModule,
        FormsModule,
        RouterTestingModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
