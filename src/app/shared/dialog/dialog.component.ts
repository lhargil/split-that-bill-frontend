import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { DialogData } from './dialog.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent implements OnInit {
  @Input() dialogData: DialogData;
  @Output() closeDialog: EventEmitter<any>;

  constructor() {
    this.closeDialog = new EventEmitter<any>();
  }

  ngOnInit() {

  }

  close(answer: boolean) {
    this.closeDialog.emit(answer);
  }
}
