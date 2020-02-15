import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Notification } from './notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent implements OnInit, OnDestroy {
  @Input() notification: Notification;
  @Output() closeClicked: EventEmitter<void>;
  timeOut: any;
  constructor() {
    this.closeClicked = new EventEmitter<void>();
  }

  ngOnInit(): void {
    // this.timeOut = setTimeout(() => {
    //   this.closeClicked.emit();
    // }, 5000);
  }

  close() {
    this.closeClicked.emit();
  }

  ngOnDestroy() {
    clearTimeout(this.timeOut);
  }
}
