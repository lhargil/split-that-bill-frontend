import { Injectable, Type } from '@angular/core';
import { Subject } from 'rxjs';

export interface ModalState {
  heading: string;
  formData: any;
  dialog: {
    heading: string;
    message: string;
  };
  component: Type<any>;
  handleSave: (eventData) => void;
  handleDelete: (eventData) => void;
}

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
