import { Component, OnInit } from '@angular/core';
import { of, Subject } from 'rxjs';
import { WizardStep } from '../wizard/models';
import { PersonEditorShellComponent } from './person-editor-shell/person-editor-shell.component';
import { PeopleEditorShellComponent } from './people-editor-shell/people-editor-shell.component';
import { BillEditorShellComponent } from './bill-editor-shell/bill-editor-shell.component';
import { BillItemsEditorShellComponent } from './bill-items-editor-shell/bill-items-editor-shell.component';
import { FriendsEditorShellComponent } from './friends-editor-shell/friends-editor-shell.component';
import { BillItemsAssignEditorShellComponent } from './bill-items-assign-editor-shell/bill-items-assign-editor-shell.component';
import { ExtraChargesEditorShellComponent } from './extra-charges-editor-shell/extra-charges-editor-shell.component';
import { ReceiptShellComponent } from './receipt-shell/receipt-shell.component';
import { BillingStoreService } from './billing-store.service';
import { BillsService } from '../bills/bills.service';
import { takeUntil, tap } from 'rxjs/operators';
import { WizardService } from '../wizard/wizard.service';
import { Step, Orientations } from '../step-tracker/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  wizardSteps = [{
    id: 1,
    stepName: 'Who were you with?',
    isDone: false,
    isActive: true,
    component: FriendsEditorShellComponent
  }, {
    id: 2,
    stepName: 'Where did you eat?',
    isDone: false,
    isActive: false,
    component: BillEditorShellComponent
  }, {
    id: 4,
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
    id: 3,
    stepName: 'Any extra charges?',
    isDone: false,
    isActive: false,
    component: ExtraChargesEditorShellComponent
  }, {
    id: 6,
    stepName: 'Summary',
    isDone: false,
    isActive: false,
    component: ReceiptShellComponent
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
  }) as WizardStep[]

  currentStep = 1;
  steps: Step[] = [];
  orientations = Orientations;

  private destroyed$ = new Subject();
  private store: any;

  constructor(private billingStore: BillingStoreService, private billService: BillsService, private wizardService: WizardService, private router: Router) { }

  ngOnInit() {
    this.steps = this.wizardSteps.map((wizardStep, i) => {
      return {
        id: i + 1,
        name: wizardStep.stepName,
        isActive: wizardStep.isActive,
        isDone: wizardStep.isDone,
        onClick: (eventData) => {
          console.log('step nav clicked');
        }
      } as Step;
    });
    this.billingStore.initializeStore();

    this.billingStore.store$
      .pipe(
        takeUntil(this.destroyed$)
      ).subscribe(store => {
        this.store = store;
      });
  }

  onClickBack($event) {
    this.wizardService.tryGoBack({
      $event,
      back: (backData) => this.backCallback(backData)
    });
  }

  onClickNext($event) {
    this.wizardService.tryGoNext({
      $event,
      next: (nextData) => {
        if (this.currentStep == this.steps.length) {
          this.onSubmit();
        } else {
          this.nextCallback(nextData);
        }
      }
    });
  }

  private onSubmit() {
    const updatedBill = {
      ...this.store.bill,
      ...{
        billItems: [...this.store.billItems.map(item => {
          const person = this.store.personBillItems.find(pbi => pbi.itemId == item.id);
          return {
            billItem: { ...item },
            personId: person.assignee
          };
        })]
      },
      ...{
        extraCharges: this.store.extraCharges.map(ec => {
          return {
            id: ec.id,
            description: ec.description,
            rate: Number(ec.amount) / 100
          };
        })
      },
      ...{
        participants: this.store.friends.filter(p => p.selected).map(p => {
          return {
            id: 0,
            person: {
              id: p.id
            }
          };
        })
      }
    };
    this.billService.createBill(updatedBill)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(createdBill => {
        this.router.navigate(['/receipt', createdBill.id]);
      });
  }

  private nextCallback(nextData) {
    const updatedStep = this.getCurrentStep(1);
    this.currentStep = updatedStep;
    this.steps = this.updateSteps(this.currentStep);
  }

  private backCallback(backData) {
    const updatedStep = this.getCurrentStep(-1);
    this.currentStep = updatedStep;
    this.steps = this.updateSteps(this.currentStep);
  }

  private getCurrentStep(step: number) {
    return this.currentStep + step <= this.steps.length ? this.currentStep + step : this.currentStep;
  }

  private updateSteps(updatedStep: number) {
    return this.steps.map(step => {
      return {
        ...step,
        isDone: step.id < updatedStep,
        isActive: step.id == updatedStep
      };
    });
  }
}
