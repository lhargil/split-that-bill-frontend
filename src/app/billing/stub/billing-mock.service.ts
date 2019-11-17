import { from, Observable, of } from 'rxjs';

export class BillingMockService {
    updatePersonBilling(id: number, personId: number, billing: any): Observable<any> {
        return of({});
    }
    getPersonBilling(): Observable<any> {
        return of({});
    }
    getBillings(): Observable<any> {
        return of({
            bill: {
                extraCharges: []
            },
            peopleBilling: []
        });
    }
}