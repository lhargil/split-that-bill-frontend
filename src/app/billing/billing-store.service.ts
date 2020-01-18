import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, combineLatest, of } from 'rxjs';
import { map, tap, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BillingStoreService {
  private billingState: {
    friends: any[],
    bill: any,
    extraCharges: any[],
    billItems: any[],
    personBillItems: any[]
  };

  private storeSubject = new BehaviorSubject<{
    friends: any[],
    bill: any,
    extraCharges: any[],
    billItems: any[],
    personBillItems: any[]
  }>(this.create());

  private sliceOfStateSubject = new BehaviorSubject<BillingStoreStateKeys | null>(null);
  private slice$ = this.sliceOfStateSubject.asObservable();

  constructor() {
  }

  get store$() {
    return this.storeSubject.asObservable();
  }

  get storeSlice$() {
    return combineLatest(
      this.store$,
      this.slice$
    ).pipe(
      map(([store, slice]) => {
        if (!slice) {
          return null;
        } else {
          return store[slice];
        }
      })
    );
  }

  getSlice(slice: BillingStoreStateKeys) {
    return this.sliceOfStateSubject.next(slice);
  }

  updateSlice(slice: BillingStoreStateKeys, data: any) {
    const updatedState = { ...this.billingState, ...{ [slice]: data } };
    this.storeSubject.next(updatedState);
  }

  private create() {
    return {
      friends: [],
      bill: {
        establishmentName: '',
        billDate: new Date().toString(),
        remarks: ''
      },
      extraCharges: [],
      billItems: [],
      personBillItems: []
    };
  }
}

export enum BillingStoreStateKeys {
  Friends = 'friends',
  Bill = 'bill',
  ExtraCharges = 'extraCharges',
  BillItems = 'billItems',
  PersonBillItems = 'personBillItems'
}
