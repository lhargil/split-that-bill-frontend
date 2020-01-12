import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { WizardStep } from '../wizard/models';
import { PersonEditorShellComponent } from './person-editor-shell/person-editor-shell.component';
import { PeopleEditorShellComponent } from './people-editor-shell/people-editor-shell.component';
import { BillEditorShellComponent } from './bill-editor-shell/bill-editor-shell.component';
import { BillItemsEditorShellComponent } from './bill-items-editor-shell/bill-items-editor-shell.component';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  wizardSteps$ = of([{
    id: 1,
    stepName: 'Your friends',
    isDone: false,
    isActive: true,
    component: PeopleEditorShellComponent
  }, {
    id: 2,
    stepName: 'Bill form',
    isDone: false,
    isActive: false,
    component: BillEditorShellComponent
  }, {
    id: 3,
    stepName: 'Bill items form',
    isDone: false,
    isActive: false,
    component: BillItemsEditorShellComponent
  },
  ] as WizardStep[]);

  constructor() { }

  ngOnInit() {
  }

}
