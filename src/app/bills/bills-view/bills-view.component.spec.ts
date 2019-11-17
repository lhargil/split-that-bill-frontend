import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsViewComponent } from './bills-view.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BillsService } from '../bills.service';
import { BillsMockService } from '../stub/bills-mock.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BillingService } from 'src/app/billing/billing.service';
import { BillingMockService } from 'src/app/billing/stub/billing-mock.service';

describe('BillsViewComponent', () => {
  let component: BillsViewComponent;
  let fixture: ComponentFixture<BillsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillsViewComponent ],
      providers: [
        { provide: BillsService, useClass: BillsMockService },
        { provide: BillingService, useClass: BillingMockService }
      ],
      imports: [
        BrowserModule,
        RouterTestingModule,
      ]
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
