import { TestBed, getTestBed } from '@angular/core/testing';

import { BillsService } from './bills.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('BillsService', () => {
  let injector: TestBed;
  let service: BillsService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        BillsService
      ]
    })
    injector = getTestBed();
    service = injector.get(BillsService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: BillsService = TestBed.get(BillsService);
    expect(service).toBeTruthy();
  });
});
