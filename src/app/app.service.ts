import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private getStartedSubject = new Subject();
  constructor() { }

  get getStarted$() {
    return this.getStartedSubject.asObservable();
  }

  getStarted() {
    this.getStartedSubject.next();
  }
}
