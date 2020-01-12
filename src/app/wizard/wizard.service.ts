import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WizardService {
  private nextStep = new Subject<any>();
  nextStep$ = this.nextStep.asObservable();
  private backStep = new Subject<any>();
  backStep$ = this.backStep.asObservable();

  constructor() { }

  tryGoNext(nextData: any) {
    this.nextStep.next(nextData);
  }

  tryGoBack(backData: any) {
    this.backStep.next(backData);
  }
}
