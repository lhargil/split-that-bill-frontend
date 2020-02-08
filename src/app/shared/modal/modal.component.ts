import { Component, OnInit, Output, EventEmitter, ViewChild, Input, ComponentFactoryResolver } from '@angular/core';
import { ContentHostDirective } from '../directives/content-host/content-host.directive';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @ViewChild(ContentHostDirective, { static: true }) modalContent: ContentHostDirective;

  @Input() content: any;
  @Output() closeClicked: EventEmitter<void>;
  @Output() saveClicked: EventEmitter<any>;
  @Output() deleteClicked: EventEmitter<any>;
  private component: any;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    this.closeClicked = new EventEmitter<void>();
    this.saveClicked = new EventEmitter<any>();
    this.deleteClicked = new EventEmitter<any>();
  }

  ngOnInit() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.content.component);

    const viewContainerRef = this.modalContent.viewContainerRef;
    viewContainerRef.clear();
    this.component = viewContainerRef.createComponent(componentFactory);
    this.component.instance.formData = this.content.formData;
  }

  close() {
    this.closeClicked.emit();
  }

  delete() {
    this.deleteClicked.emit(this.content.formData);
  }

  save() {
    this.component.instance.formSubmit(formValues => this.saveClicked.emit(formValues));
  }
}
