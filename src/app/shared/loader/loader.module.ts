import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader.component';
import { LoadingInterceptor } from './loading-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';



@NgModule({
  declarations: [LoaderComponent],
  imports: [
    CommonModule
  ],
  exports: [
    LoaderComponent
  ]
})
export class LoaderModule { }
