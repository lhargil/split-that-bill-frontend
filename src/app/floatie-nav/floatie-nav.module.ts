import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FloatieNavComponent } from './floatie-nav.component';
import { MenuModule } from '../menu/menu.module';



@NgModule({
  declarations: [FloatieNavComponent],
  imports: [
    SharedModule,
    MenuModule
  ],
  exports: [FloatieNavComponent]
})
export class FloatieNavModule { }
