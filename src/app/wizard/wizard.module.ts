import { NgModule } from '@angular/core';
import { WizardContentComponent } from './wizard-content/wizard-content.component';
import { WizardComponent } from './wizard.component';
import { SharedModule } from '../shared/shared.module';
import { StepTrackerModule } from '../step-tracker/step-tracker.module';
import { ContentHostDirective } from './content-host.directive';



@NgModule({
  declarations: [WizardContentComponent, WizardComponent, ContentHostDirective],
  imports: [
    SharedModule,
    StepTrackerModule
  ],
  exports: [WizardComponent]
})
export class WizardModule { }
