import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WizardContentComponent } from './wizard-content/wizard-content.component';
import { WizardTocComponent } from './wizard-toc/wizard-toc.component';
import { WizardNavComponent } from './wizard-nav/wizard-nav.component';
import { WizardComponent } from './wizard.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [WizardContentComponent, WizardTocComponent, WizardNavComponent, WizardComponent],
  imports: [
    SharedModule
  ],
  exports: [WizardComponent]
})
export class WizardModule { }
