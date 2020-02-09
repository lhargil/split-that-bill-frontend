import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalState } from './modalState';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private notificationSubject = new Subject<ModalState>();
  get notification$() {
    return this.notificationSubject.asObservable();
  }
  constructor() { }

  show(data: ModalState) {
    this.notificationSubject.next({ ...data });
  }
}
