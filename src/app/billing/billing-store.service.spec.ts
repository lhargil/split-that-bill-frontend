import { TestBed } from '@angular/core/testing';

import { BillingStoreService } from './billing-store.service';

describe('BillingStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BillingStoreService = TestBed.get(BillingStoreService);
    expect(service).toBeTruthy();
  });
});
