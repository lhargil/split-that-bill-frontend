import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { WizardStep } from './models';

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

  private wizardStep = new BehaviorSubject<WizardStep>(null);
  get wizardStep$() {
    return this.wizardStep.asObservable();
  }

  constructor() { }

  currentStep(step: WizardStep) {
    this.wizardStep.next(step);
  }

  tryGoNext(nextData: any) {
    this.nextStep.next(nextData);
  }

  tryGoBack(backData: any) {
    this.backStep.next(backData);
  }
}
