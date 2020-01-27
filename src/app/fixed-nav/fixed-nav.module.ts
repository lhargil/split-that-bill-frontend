import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav.component';
import { SharedModule } from '../shared/shared.module';
import { MenuModule } from '../menu/menu.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [NavComponent],
  imports: [
    SharedModule,
    MenuModule,
    RouterModule
  ],
  exports: [NavComponent]
})
export class FixedNavModule { }
