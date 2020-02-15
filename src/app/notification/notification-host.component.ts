import { Component, OnInit } from '@angular/core';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notification-host',
  templateUrl: './notification-host.component.html',
  styles: []
})
export class NotificationHostComponent implements OnInit {
  notifications: Notification[];

  constructor(private notificationService: NotificationService) {
    this.notifications = [];
  }

  ngOnInit(): void {
    this.notificationService.notification$
      .subscribe(notification => {
        this.notifications.push(notification);
      });

  }

  close(index: number) {
    this.notifications = [...this.notifications.filter((v, i) => i != index)];
  }
}
