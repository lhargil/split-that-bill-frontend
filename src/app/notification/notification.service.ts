import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export const enum NotificationTypes {
  error,
  info,
  success,
  warning,
}

export interface NotificationState {
  type: NotificationTypes;
  payload: any;
}

export class Notification {
  header = '';
  message = '';
  button = null;
  styling = {
    background: '',
    border: '',
    textColor: ''
  };
  static create(notificationType: NotificationTypes, data: any): Notification {
    return new Notification(notificationType, data);
  }

  private constructor(notificationType: NotificationTypes, public data: any) {
    this.header = data.header;
    this.message = data.message;
    this.button = data.button && { ...data.button };
    this.styling = this.getNotificationClass(notificationType);
  }

  private getNotificationClass(type: NotificationTypes) {
    let notificationClass: any;
    switch (type) {
      case NotificationTypes.error:
        notificationClass = {
          background: 'bg-red-200',
          border: 'border-red-700',
          textColor: 'text-red-700',
        };
        break;
      case NotificationTypes.info:
        notificationClass = {
          background: 'bg-blue-200',
          border: 'border-blue-700',
          textColor: 'text-blue-700',
        };
        break;
      case NotificationTypes.success:
        notificationClass = {
          background: 'bg-green-200',
          border: 'border-green-700',
          textColor: 'text-green-700',
        };
        break;
      case NotificationTypes.warning:
        notificationClass = {
          background: 'bg-orange-200',
          border: 'border-orange-700',
          textColor: 'text-orange-700',
        };
        break;

    }

    return notificationClass;
  }
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject: Subject<any>;
  get notification$() {
    return this.notificationSubject.asObservable();
  }
  constructor() {
    this.notificationSubject = new Subject<any>();
  }

  success(payload: any) {
    this.send(Notification.create(NotificationTypes.success,
      payload));
  }

  error(payload: any) {
    this.send(Notification.create(NotificationTypes.error,
      payload));
  }

  info(payload: any) {
    this.send(Notification.create(NotificationTypes.info,
      payload));
  }

  warn(payload: any) {
    this.send(Notification.create(NotificationTypes.warning,
      payload));
  }

  private send(notification: any) {

    this.notificationSubject.next(notification);
  }
}
