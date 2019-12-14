import { of, from, Observable } from 'rxjs';

export class PeopleMockService {
  getPeople(): Observable<any> {
    return from([]);
  }
  getPersonBillItems(): Observable<any> {
    return from([]);
  }
  createPerson(): Observable<any> {
    return of({});
  }
  updatePerson(): Observable<any> {
    return of({});
  }
}
