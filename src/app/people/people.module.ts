import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeopleRoutingModule } from './people-routing.module';
import { PeopleComponent } from './people.component';
import { PeopleListComponent } from './people-list/people-list.component';


@NgModule({
  declarations: [PeopleComponent, PeopleListComponent],
  imports: [
    CommonModule,
    PeopleRoutingModule
  ]
})
export class PeopleModule { }
