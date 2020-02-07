import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog.component';
import { SharedModule } from '../shared.module';
import { DialogHostComponent } from './dialog-host.component';
import { ContentHostModule } from '../directives/content-host/content-host.module';



@NgModule({
  declarations: [DialogComponent, DialogHostComponent],
  imports: [
    CommonModule,
    ContentHostModule
  ],
  exports: [DialogHostComponent],
  entryComponents: [DialogComponent]
})
export class DialogModule { }
