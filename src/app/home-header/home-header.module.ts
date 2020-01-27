import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { FloatieNavModule } from '../floatie-nav/floatie-nav.module';
import { MenuModule } from '../menu/menu.module';
import { FixedNavModule } from '../fixed-nav/fixed-nav.module';
import { HomeHeaderComponent } from './home-header.component';



@NgModule({
  declarations: [
    HomeHeaderComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule,
    FloatieNavModule,
    MenuModule,
    FixedNavModule
  ],
  exports: [
    HomeHeaderComponent
  ]
})
export class HomeHeaderModule { }
