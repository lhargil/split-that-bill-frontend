import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notification = {
    header: 'Notification Header from TS',
    message: 'This is an informative message to you from TS.',
    button: {
      callback: eventData => { console.log('Action button was triggered. '); },
      text: 'Ok'
    },
    styling: {
      border: '',
      color: '',

    }
  };

  constructor() { }

  ngOnInit(): void {
  }

  close() { }
}
