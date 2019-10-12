import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  exports: [
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ]
})
export class SharedModule { }
