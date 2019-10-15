import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person, PersonBillItems } from './person';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private peopleApi = `${environment.baseUrl}/api/people`;
  constructor(private httpClient: HttpClient) { }

  getPeople(): Observable<Person[]> {
    return this.httpClient.get<Person[]>(this.peopleApi);
  }

  getPersonBillItems(id: number): Observable<PersonBillItems> {
    return this.httpClient.get<PersonBillItems>(`${this.peopleApi}/${id}/items`);
  }
}
