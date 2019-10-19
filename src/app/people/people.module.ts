import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeopleRoutingModule } from './people-routing.module';
import { PeopleComponent } from './people.component';
import { PeopleListComponent } from './people-list/people-list.component';
import { PersonBillItemsComponent } from './person-bill-items/person-bill-items.component';
import { PersonEditorComponent } from './person-editor/person-editor.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [PeopleComponent, PeopleListComponent, PersonBillItemsComponent, PersonEditorComponent],
  imports: [
    SharedModule,
    PeopleRoutingModule
  ]
})
export class PeopleModule { }
