import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getPerson(id: number): Observable<Person> {
    return this.httpClient.get<Person>(`${this.peopleApi}/${id}`);
  }

  getPersonBillItems(id: number): Observable<PersonBillItems> {
    return this.httpClient.get<PersonBillItems>(`${this.peopleApi}/${id}/items`);
  }

  createPerson(person: Person): Observable<Person> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<Person>(this.peopleApi, person, { headers });
  }

  updatePerson(person: Person): Observable<Person> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.peopleApi}/${person.id}`;
    return this.httpClient.put<Person>(url, person, { headers });
  }
}
