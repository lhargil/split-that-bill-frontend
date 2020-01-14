import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WizardService {
  private nextStep = new Subject<any>();
  get nextStep$() {
    return this.nextStep.asObservable();
  }
  private backStep = new Subject<any>();
  get backStep$() {
    return this.backStep.asObservable();
  }

  constructor() { }

  tryGoNext(nextData: any) {
    this.nextStep.next(nextData);
  }

  tryGoBack(backData: any) {
    this.backStep.next(backData);
  }
}
