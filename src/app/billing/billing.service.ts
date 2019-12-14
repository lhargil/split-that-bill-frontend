import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersonBillItems } from '../people/person';
import { Billing } from './billing';

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  private billingApi = `${environment.baseUrl}/api/bills`;
  constructor(private httpClient: HttpClient) { }

  updatePersonBilling(id: number, personId: number, billing: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put(`${this.billingApi}/${id}/billings/${personId}`, billing, { headers });
  }

  getPersonBilling(personId: number): Observable<PersonBillItems> {
    return this.httpClient.get<PersonBillItems>(`${this.billingApi}/billings/${personId}`);
  }

  getBillings(id: number): Observable<Billing> {
    return this.httpClient.get<Billing>(`${this.billingApi}/${id}/billings`);
  }
}
