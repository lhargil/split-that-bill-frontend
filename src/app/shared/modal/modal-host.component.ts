import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { ContentHostDirective } from '../directives/content-host/content-host.directive';
import { ModalService } from './modal.service';
import { ModalState, ModalModes } from "./modalState";
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

      this.toggleBodyScroll(true);

      refs.component.closeClicked.subscribe(_ => {
        this.dismissModal(refs);
      });
      refs.component.saveClicked.subscribe(eventData => {
        state.handleSave(eventData);
        this.dismissModal(refs);
      });
      if (state.handleDelete) {
        refs.component.deleteClicked.subscribe(eventData => {
          this.dialogService.confirm({
            heading: state.dialog.heading,
            message: state.dialog.message,
            callback: affirmativeAnswer => {
              if (affirmativeAnswer) {
                state.handleDelete(eventData);
                this.dismissModal(refs);
              }
            }
          });
        });
      }
      refs.component.content = {
        component: state.component,
        formData: state.formData,
        heading: state.heading,
        showDelete: state.modalMode == ModalModes.update
      };
    };
  }

  private dismissModal(refs) {
    refs.viewContainerRef.clear();
    this.toggleBodyScroll(false);
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

  private toggleBodyScroll(toggledOn: boolean) {
    if (toggledOn) {
      document.querySelector('body').classList.add('modal-open');
    } else {
      document.querySelector('body').classList.remove('modal-open');
    }
  }
}
