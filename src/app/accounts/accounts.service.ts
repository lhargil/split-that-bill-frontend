import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PaymentDetail } from '../people/person';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  private accountsApi = {
    paymentDetails: `${environment.baseUrl}/api/people/{0}/paymentdetails`
  };
  constructor(private httpClient: HttpClient) { }

  getPaymentDetails(id: number): Observable<PaymentDetail[]> {
    const paymentDetailsApi = this.accountsApi.paymentDetails.replace('{0}', String(id));
    return this.httpClient.get<PaymentDetail[]>(paymentDetailsApi);
  }

  getSinglePaymentDetails(id: number, paymentDetailId: number) {
    const paymentDetailsApi = `${this.accountsApi.paymentDetails.replace('{0}', String(id))}/${paymentDetailId}`;
    return this.httpClient.get<PaymentDetail>(paymentDetailsApi);
  }

  updatePaymentDetails(id: number, paymentDetailId: number, personPaymentDetail: any) {
    const paymentDetailsApi = `${this.accountsApi.paymentDetails.replace('{0}', String(id))}/${paymentDetailId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put(paymentDetailsApi, personPaymentDetail, { headers })
      .pipe(
        map(() => 'Payment details updated')
      );
  }

  createPaymentDetails(id: number, personPaymentDetail: any) {
    const paymentDetailsApi = this.accountsApi.paymentDetails.replace('{0}', String(id));
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(paymentDetailsApi, personPaymentDetail, { headers, observe: 'response' })
      .pipe(
        map(response => {
          return {
            paymentDetails: response.body as PaymentDetail,
            location: response.headers.get('Location')
          }
        })
      );
  }

  deletePaymentDetails(id: number, paymentDetailsId: number) {
    const paymentDetailsApi = `${this.accountsApi.paymentDetails.replace('{0}', String(id))}/${paymentDetailsId}`;
    return this.httpClient.delete(paymentDetailsApi);
  }
}
