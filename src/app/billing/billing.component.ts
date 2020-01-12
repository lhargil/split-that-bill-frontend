import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { WizardStep } from '../wizard/models';
import { PersonEditorShellComponent } from './person-editor-shell/person-editor-shell.component';
import { WizardService } from '../wizard/wizard.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  wizardSteps$ = of([{
    id: 1,
    stepName: 'Person profile',
    isDone: false,
    isActive: true,
    component: PersonEditorShellComponent
  }, {
    id: 2,
    stepName: 'Friend profile',
    isDone: false,
    isActive: false,
    component: PersonEditorShellComponent
  },] as WizardStep[]);

  constructor() { }

  ngOnInit() {
  }

}
