import { Component, OnInit, ComponentFactoryResolver, ViewChild, ElementRef } from '@angular/core';
import { DialogComponent } from './dialog.component';
import { ContentHostDirective } from '../directives/content-host/content-host.directive';
import { DialogService, DialogState, DialogTypes } from './dialog.service';

@Component({
  selector: 'app-dialog-host',
  templateUrl: './dialog-host.component.html',
  styleUrls: ['./dialog-host.component.scss']
})
export class DialogHostComponent implements OnInit {
  @ViewChild(ContentHostDirective, { static: true }) dialogContent: ContentHostDirective;
  constructor(private componentFactoryResolver: ComponentFactoryResolver, private dialogService: DialogService) { }

  ngOnInit() {
    this.dialogService.notification$
      .subscribe(this.handleDialogNotifications());
  }

  private handleDialogNotifications(): (dialogState: DialogState) => void {
    return state => {
      const refs = this.loadComponent();

      refs.component.dialogData = state.data;
      refs.component.closeDialog.subscribe(this.handleCloseDialogEvent(refs, state));
    };
  }

  private handleCloseDialogEvent(refs, state: DialogState): any {
    return eventData => {
      refs.viewContainerRef.clear();
      state.data.callback(eventData);
    };
  }

  private loadComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DialogComponent);

    const viewContainerRef = this.dialogContent.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    return {
      component: componentRef.instance as DialogComponent,
      viewContainerRef
    };
  }
}
