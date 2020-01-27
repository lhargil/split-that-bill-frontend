import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { HomeHeaderModule } from '../home-header/home-header.module';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    SharedModule,
    HomeHeaderModule,
    AppRoutingModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
