import { Injectable, Type } from '@angular/core';
import { Subject } from 'rxjs';

export interface DialogData {
  heading: string;
  message: string;
  callback: (eventData: any) => {};
}

export const enum DialogTypes {
  alert,
  confirm,
  error,
  info
}

export interface DialogState {
  data: DialogData;
  type: DialogTypes;
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private notification = new Subject<DialogState>();

  get notification$() {
    return this.notification.asObservable();
  }

  constructor() { }

  info(data: DialogData) {
    const dialogState = { data: { ...data }, ...{ type: DialogTypes.info } };

    this.notification.next(dialogState);
  }

  dismiss() {

  }
}
