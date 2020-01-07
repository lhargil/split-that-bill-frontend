import { NgModule } from '@angular/core';
import { StepTrackerComponent } from './step-tracker.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [StepTrackerComponent],
  imports: [
    SharedModule
  ],
  exports: [StepTrackerComponent]
})
export class StepTrackerModule { }
