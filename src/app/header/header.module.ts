import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { FloatieNavModule } from '../floatie-nav/floatie-nav.module';
import { MenuModule } from '../menu/menu.module';
import { FixedNavModule } from '../fixed-nav/fixed-nav.module';
import { HeaderComponent } from './header.component';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule,
    FloatieNavModule,
    MenuModule,
    FixedNavModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
