import { NgModule } from '@angular/core';
import { WizardComponent } from './wizard.component';
import { SharedModule } from '../shared/shared.module';
import { StepTrackerModule } from '../step-tracker/step-tracker.module';
import { ContentHostDirective } from '../shared/directives/content-host.directive';



@NgModule({
  declarations: [WizardComponent, ContentHostDirective,],
  imports: [
    SharedModule,
    StepTrackerModule
  ],
  exports: [WizardComponent],
})
export class WizardModule { }
