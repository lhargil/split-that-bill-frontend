import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { ContentHostDirective } from '../shared/directives/content-host/content-host.directive';
import { NotificationComponent } from './notification.component';

@Component({
  selector: 'app-notification-host',
  templateUrl: './notification-host.component.html',
  styles: []
})
export class NotificationHostComponent implements OnInit {
  @ViewChild(ContentHostDirective, { static: true }) notificationHost: ContentHostDirective;


  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.loadComponent();
  }

  private loadComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(NotificationComponent);

    const viewContainerRef = this.notificationHost.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent(componentFactory);
  }
}
