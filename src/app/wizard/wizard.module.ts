import { NgModule } from '@angular/core';
import { WizardComponent } from './wizard.component';
import { SharedModule } from '../shared/shared.module';
import { StepTrackerModule } from '../step-tracker/step-tracker.module';
import { ContentHostModule } from '../shared/directives/content-host/content-host.module';



@NgModule({
  declarations: [WizardComponent,],
  imports: [
    SharedModule,
    StepTrackerModule,
    ContentHostModule
  ],
  exports: [WizardComponent],
})
export class WizardModule { }
