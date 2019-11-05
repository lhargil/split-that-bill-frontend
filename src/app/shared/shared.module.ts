import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { WithChargePipe } from './pipes/with-charge.pipe';
import { ApplyChargesPipe } from './pipes/apply-charges.pipe';


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
    ApplyChargesPipe
  ]
})
export class SharedModule { }
