import { Component, OnInit, Output, EventEmitter, ViewChild, Input, ComponentFactoryResolver, ElementRef, Renderer2, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { ContentHostDirective } from '../directives/content-host/content-host.directive';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
  @ViewChild(ContentHostDirective, { static: true }) modalContent: ContentHostDirective;
  @ViewChild('modalContainer', { static: true }) modalContainer: ElementRef;

  @Input() content: any;
  @Output() closeClicked: EventEmitter<void>;
  @Output() saveClicked: EventEmitter<any>;
  @Output() deleteClicked: EventEmitter<any>;
  private component: any;
  private destroyed$ = new Subject();
  isBrowser: boolean;
  constructor(private componentFactoryResolver: ComponentFactoryResolver, private renderer: Renderer2, @Inject(PLATFORM_ID) platformId: any) {
    this.isBrowser = isPlatformBrowser(platformId);
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

    if (this.isBrowser) {
      fromEvent(window, 'resize')
        .pipe(
          debounceTime(200),
          takeUntil(this.destroyed$),
        ).subscribe(
          _ => this.resetHeight()
        );
    }
    this.resetHeight();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
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

  // this is a solution to handle the 100vh element height in IOS Safari as the browser bottom navigation covers up a portion of the bottom part of an element
  // see more: https://stackoverflow.com/questions/43575363/css-100vh-is-too-tall-on-mobile-due-to-browser-ui
  private resetHeight() {
    if (this.isBrowser) {
      this.renderer.setStyle(this.modalContainer.nativeElement, 'height', window.innerHeight + 'px');
    }
  }
}
