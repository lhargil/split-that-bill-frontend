import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, combineLatest, of } from 'rxjs';
import { map, tap, startWith } from 'rxjs/operators';
import { BillingData } from './billing';

@Injectable({
  providedIn: 'root'
})
export class BillingStoreService {
  private billingState: BillingData;

  private storeSubject = new BehaviorSubject<BillingData>(null);

  private sliceOfStateSubject = new BehaviorSubject<BillingStoreStateKeys | null>(null);
  private slice$ = this.sliceOfStateSubject.asObservable();

  constructor() {
  }

  get store$() {
    return this.storeSubject.asObservable();
  }

  get storeSlice$() {
    return combineLatest(
      [this.store$,
      this.slice$]
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

  getStoreSlices$(slices: BillingStoreStateKeys[]) {
    return this.store$
      .pipe(
        map(store => {
          let storeSlice = {};
          slices.forEach(slice => {
            storeSlice = { ...storeSlice, ...{ [slice]: store[slice] } };
          });
          return storeSlice;
        })
      );
  }

  getStoreSlice$(slice: BillingStoreStateKeys) {
    this.sliceOfStateSubject.next(slice);
    return combineLatest(
      [this.store$,
      this.slice$]
    ).pipe(
      map(([store, storeSlice]) => {
        if (!storeSlice) {
          return null;
        } else {
          return store[storeSlice];
        }
      })
    );
  }

  getSlice(slice: BillingStoreStateKeys) {
    return this.sliceOfStateSubject.next(slice);
  }

  updateSlice(slice: BillingStoreStateKeys, data: any) {
    this.billingState = { ...this.billingState, ...{ [slice]: data } };
    this.storeSubject.next(this.billingState);
  }

  initializeStore() {
    this.billingState = this.create();
    this.storeSubject.next(this.billingState);
  }

  private create() {
    return {
      friends: [],
      bill: {
        establishmentName: '',
        billDate: new Date().toString(),
        remarks: '',
        currency: ''
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
