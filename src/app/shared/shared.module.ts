import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { WithChargePipe } from './pipes/with-charge.pipe';
import { ApplyChargesPipe } from './pipes/apply-charges.pipe';
import { LoaderModule } from './loader/loader.module';
import { ModalModule } from './modal/modal.module';
import { DialogModule } from './dialog/dialog.module';


@NgModule({
  declarations: [WithChargePipe, ApplyChargesPipe],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  exports: [
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    WithChargePipe,
    ApplyChargesPipe,
    LoaderModule
  ]
})
export class SharedModule { }
