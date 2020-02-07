import { Component, OnInit, ViewChild, ElementRef, OnDestroy, Type, ComponentFactoryResolver, Renderer2, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { DialogService, DialogData } from './dialog.service';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { ContentHostDirective } from '../directives/content-host/content-host.directive';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent implements OnInit {
  @Input() dialogData: DialogData;
  @Output() closeDialog: EventEmitter<void>;

  constructor() {
    this.closeDialog = new EventEmitter<void>();
  }

  ngOnInit() {

  }

  close() {
    this.closeDialog.emit();
  }
}
