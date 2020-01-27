import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from './page-header.component';
import { SharedModule } from '../shared/shared.module';
import { MenuModule } from '../menu/menu.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [PageHeaderComponent],
  imports: [
    SharedModule,
    RouterModule
  ],
  exports: [PageHeaderComponent]
})
export class PageHeaderModule { }
