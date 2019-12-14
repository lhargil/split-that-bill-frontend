import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsComponent } from './accounts.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Observable, of, from } from 'rxjs';
import { AccountsService } from './accounts.service';

class AccountMockService {
  getPaymentDetails(): Observable<any> {
    return from([]);
  }
  getSinglePaymentDetails(): Observable<any> {
    return of({});
  }
  updatePaymentDetails(): Observable<any> {
    return of({});
  }
  createPaymentDetails(): Observable<any> {
    return of({});
  }
  deletePaymentDetails(): Observable<any> {
    return of({});
  }
}

describe('AccountsComponent', () => {
  let component: AccountsComponent;
  let fixture: ComponentFixture<AccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountsComponent],
      providers: [
        { provide: AccountsService, useClass: AccountMockService }
      ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
