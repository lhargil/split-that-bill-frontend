import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { ContentHostDirective } from '../directives/content-host/content-host.directive';
import { ModalService, ModalState } from './modal.service';
import { ModalComponent } from './modal.component';
import { DialogService } from '../dialog/dialog.service';

@Component({
  selector: 'app-modal-host',
  templateUrl: './modal-host.component.html',
  styleUrls: ['./modal-host.component.scss']
})
export class ModalHostComponent implements OnInit {
  @ViewChild(ContentHostDirective, { static: true }) modalContent: ContentHostDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private modalService: ModalService,
    private dialogService: DialogService) { }

  ngOnInit(): void {
    this.modalService.notification$
      .subscribe(this.handleModalNotifications());
  }

  private handleModalNotifications(): (modalState: ModalState) => void {
    return state => {
      const refs = this.loadComponent(ModalComponent);
      refs.component.closeClicked.subscribe(_ => {
        refs.viewContainerRef.clear();
      });
      refs.component.saveClicked.subscribe(eventData => {
        state.handleSave(eventData);
        refs.viewContainerRef.clear();
      });
      refs.component.deleteClicked.subscribe(eventData => {
        this.dialogService.confirm({
          heading: 'Removing a friend',
          message: 'Are you sure you want to remove your friend from the list?',
          callback: affirmativeAnswer => {
            if (affirmativeAnswer) {
              state.handleDelete(eventData);
              refs.viewContainerRef.clear();
            }
          }
        });
      });
      refs.component.content = {
        component: state.component,
        formData: state.formData,
        heading: state.heading,
      };
    };
  }

  private loadComponent(componentToRender) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentToRender);

    const viewContainerRef = this.modalContent.viewContainerRef;
    viewContainerRef.clear();

    return {
      component: viewContainerRef.createComponent(componentFactory).instance as ModalComponent,
      viewContainerRef
    };
  }
}
