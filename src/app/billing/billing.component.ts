import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { WizardStep } from '../wizard/models';
import { PersonEditorShellComponent } from './person-editor-shell/person-editor-shell.component';
import { PeopleEditorShellComponent } from './people-editor-shell/people-editor-shell.component';
import { BillEditorShellComponent } from './bill-editor-shell/bill-editor-shell.component';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  wizardSteps$ = of([{
    id: 1,
    stepName: 'Bill profile',
    isDone: false,
    isActive: true,
    component: BillEditorShellComponent
  }, {
    id: 2,
    stepName: 'People profile',
    isDone: false,
    isActive: false,
    component: PeopleEditorShellComponent
  }, {
    id: 3,
    stepName: 'Friend profile',
    isDone: false,
    isActive: false,
    component: PersonEditorShellComponent
  },] as WizardStep[]);

  constructor() { }

  ngOnInit() {
  }

}
