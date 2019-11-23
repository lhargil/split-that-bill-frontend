import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { NavComponent } from './nav/nav.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { FloatieNavComponent } from './floatie-nav/floatie-nav.component';



@NgModule({
  declarations: [
    HeaderComponent,
    NavComponent,
    FloatieNavComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
