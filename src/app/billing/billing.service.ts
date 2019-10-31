import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  private billingApi = `${environment.baseUrl}/api/bills`;
  constructor(private httpClient: HttpClient) { }

  updatePersonBilling(personId: number, billing: any): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.put(`${this.billingApi}/${billing.bill.id}/billing/${personId}`, billing, {headers});
  }
}
