import { TestBed, getTestBed } from '@angular/core/testing';

import { PeopleService } from './people.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('PeopleService', () => {
  let injector: TestBed;
  let service: PeopleService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PeopleService
      ],
      imports: [
        HttpClientTestingModule
      ]
    })
    injector = getTestBed();
    service = injector.get(PeopleService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: PeopleService = TestBed.get(PeopleService);
    expect(service).toBeTruthy();
  });
});
