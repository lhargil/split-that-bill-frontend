import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loadingCollection = [];
  isLoading = new Subject<boolean>();
  show() {
    this.loadingCollection.push(1);
    this.somethingIsLoading();
  }
  hide() {
    this.loadingCollection.pop();
    this.somethingIsLoading();
  }
  private somethingIsLoading() {
    this.isLoading.next(this.loadingCollection && this.loadingCollection.length > 0);
  }
  constructor() { }
}
