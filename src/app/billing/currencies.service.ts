import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Currency } from './models';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {
  private currencyApi = `${environment.baseUrl}/api/currencies`;
  constructor(private httpClient: HttpClient) { }

  getCurrencies() {
    return this.httpClient.get<Currency[]>(this.currencyApi);
  }
}
