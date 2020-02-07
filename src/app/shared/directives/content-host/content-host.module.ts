import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentHostDirective } from './content-host.directive';



@NgModule({
  declarations: [ContentHostDirective],
  imports: [
    CommonModule
  ],
  exports: [ContentHostDirective]
})
export class ContentHostModule { }
