import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonFormComponent } from './person-form/person-form.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [PersonFormComponent],
  imports: [
    SharedModule
  ],
  exports: [PersonFormComponent]
})
export class FormsModule { }
