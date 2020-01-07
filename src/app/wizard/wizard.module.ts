import { NgModule } from '@angular/core';
import { WizardContentComponent } from './wizard-content/wizard-content.component';
import { WizardNavComponent } from './wizard-nav/wizard-nav.component';
import { WizardComponent } from './wizard.component';
import { SharedModule } from '../shared/shared.module';
import { StepTrackerModule } from '../step-tracker/step-tracker.module';



@NgModule({
  declarations: [WizardContentComponent, WizardNavComponent, WizardComponent],
  imports: [
    SharedModule,
    StepTrackerModule
  ],
  exports: [WizardComponent]
})
export class WizardModule { }
