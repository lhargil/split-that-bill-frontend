import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BillDto } from './bills';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BillsService {
  private billsApi = `${environment.baseUrl}/api/bills`
  constructor(private httpClient: HttpClient) { }

  getBillByGuid(guid: string) {
    return this.httpClient.get<BillDto>(`${this.billsApi}/${guid}`);
  }

  getBills(): Observable<BillDto[]> {
    return this.httpClient.get<BillDto[]>(this.billsApi);
  }

  getBill(id: number): Observable<BillDto> {
    return this.httpClient.get<BillDto>(`${this.billsApi}/${id}`);
  }

  createBill(bill: BillDto) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<BillDto>(this.billsApi, bill, { headers, observe: 'response' })
      .pipe(
        map(response => response.body),
        catchError(error => throwError(error))
      );
  }

  updateBill(bill: BillDto) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.billsApi}/${bill.id}`;
    return this.httpClient.put<BillDto>(url, bill, { headers });
  }

  deleteBill(id: number) {
    const url = `${this.billsApi}/${id}`;
    return this.httpClient.delete(url);
  }
}
