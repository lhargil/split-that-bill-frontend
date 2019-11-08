import { NgModule } from '@angular/core';

import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsComponent } from './accounts.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [AccountsComponent],
  imports: [
    SharedModule,
    AccountsRoutingModule
  ]
})
export class AccountsModule { }
