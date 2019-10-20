import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { WithChargePipe } from './pipes/with-charge.pipe';


@NgModule({
  declarations: [WithChargePipe],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  exports: [
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    WithChargePipe
  ]
})
export class SharedModule { }
