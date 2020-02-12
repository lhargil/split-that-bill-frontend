import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationHostComponent } from './notification-host.component';
import { NotificationComponent } from './notification.component';
import { ContentHostModule } from '../shared/directives/content-host/content-host.module';



@NgModule({
  declarations: [NotificationHostComponent, NotificationComponent],
  imports: [
    CommonModule,
    ContentHostModule
  ],
  exports: [NotificationHostComponent],
  entryComponents: [NotificationComponent]
})
export class NotificationModule { }
