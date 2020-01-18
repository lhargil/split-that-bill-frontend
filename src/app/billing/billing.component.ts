import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { WizardStep } from '../wizard/models';
import { PersonEditorShellComponent } from './person-editor-shell/person-editor-shell.component';
import { PeopleEditorShellComponent } from './people-editor-shell/people-editor-shell.component';
import { BillEditorShellComponent } from './bill-editor-shell/bill-editor-shell.component';
import { BillItemsEditorShellComponent } from './bill-items-editor-shell/bill-items-editor-shell.component';
import { FriendsEditorShellComponent } from './friends-editor-shell/friends-editor-shell.component';
import { BillItemsAssignEditorShellComponent } from './bill-items-assign-editor-shell/bill-items-assign-editor-shell.component';
import { ExtraChargesEditorShellComponent } from './extra-charges-editor-shell/extra-charges-editor-shell.component';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  wizardSteps$ = of([{
    id: 2,
    stepName: 'Who were you with?',
    isDone: false,
    isActive: true,
    component: FriendsEditorShellComponent
  }, {
    id: 3,
    stepName: 'Where did you eat?',
    isDone: false,
    isActive: false,
    component: BillEditorShellComponent
  }, {
    id: 1,
    stepName: 'What did you eat?',
    isDone: false,
    isActive: false,
    component: BillItemsEditorShellComponent
  }, {
    id: 5,
    stepName: 'Who ate what?',
    isDone: false,
    isActive: false,
    component: BillItemsAssignEditorShellComponent
  }, {
    id: 4,
    stepName: 'Any extra charges?',
    isDone: false,
    isActive: false,
    component: ExtraChargesEditorShellComponent
  }
  ].sort((step1, step2) => {
    if (step1.id < step2.id) {
      return -1;
    }
    if (step1.id > step2.id) {
      return 1;
    }
    // a must be equal to b
    return 0;
  }) as WizardStep[]);

  constructor() { }

  ngOnInit() {
  }

}
