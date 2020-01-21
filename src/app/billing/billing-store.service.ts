import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, combineLatest, of } from 'rxjs';
import { map, tap, startWith } from 'rxjs/operators';
import { BillingData } from './billing';

@Injectable({
  providedIn: 'root'
})
export class BillingStoreService {
  private billingState: BillingData;

  private storeSubject = new BehaviorSubject<BillingData>(this.create());

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
      this.store$,
      this.slice$
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

  private create() {
    this.billingState = {
      friends: [{
        id: 1,
        firstname: 'Lhar',
        lastname: 'Gil',
        fullname: 'Lhar Gil',
        selected: true
      }],
      bill: {
        establishmentName: 'Nandos\'s Avenue K',
        billDate: new Date().toString(),
        remarks: 'Random dinner'
      },
      extraCharges: [{
        id: -1,
        amount: 6,
        description: 'SST'
      }],
      billItems: [{
        id: -1,
        description: '1/4 Chicken',
        amount: 18.50,
        discount: null
      }, {
        id: -2,
        description: 'Iced lemon tea',
        amount: 5.50,
        discount: null
      }],
      personBillItems: [{
        itemId: -1,
        assignee: 1
      }]
    };
    return this.billingState;
  }
}

export enum BillingStoreStateKeys {
  Friends = 'friends',
  Bill = 'bill',
  ExtraCharges = 'extraCharges',
  BillItems = 'billItems',
  PersonBillItems = 'personBillItems'
}
