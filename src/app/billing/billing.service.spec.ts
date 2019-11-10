import { TestBed, getTestBed } from '@angular/core/testing';

import { BillingService } from './billing.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('BillingService', () => {
  let injector: TestBed;
  let service: BillingService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        BillingService
      ]
    })
    injector = getTestBed();
    service = injector.get(BillingService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const service: BillingService = TestBed.get(BillingService);
    expect(service).toBeTruthy();
  });
});
