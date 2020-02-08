import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { ModalHostComponent } from './modal-host.component';
import { ContentHostModule } from '../directives/content-host/content-host.module';



@NgModule({
  declarations: [ModalComponent, ModalHostComponent],
  imports: [
    CommonModule,
    ContentHostModule
  ],
  exports: [ModalHostComponent],
  entryComponents: [ModalComponent]
})
export class ModalModule { }
