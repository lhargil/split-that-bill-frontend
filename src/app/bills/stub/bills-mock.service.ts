import { from, of, Observable } from 'rxjs';

export class BillsMockService {
  getBills(): Observable<any> {
    return from([]);
  }
  createBill(): Observable<any> {
    return of(1);
  }
  updateBill(): Observable<any> {
    return of(1);
  }
  deleteBill(): Observable<any> {
    return of(1);
  }
  getBill(id: number): Observable<any> {
    return of({
      bill: { extraCharges: [] }
    });
  }
}
