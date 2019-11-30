import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { NavComponent } from './nav/nav.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { FloatieNavComponent } from './floatie-nav/floatie-nav.component';
import { MenuComponent } from './menu/menu.component';



@NgModule({
  declarations: [
    HeaderComponent,
    NavComponent,
    FloatieNavComponent,
    MenuComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    HeaderComponent,
    NavComponent,
    FloatieNavComponent,
    MenuComponent
  ]
})
export class HeaderModule { }
