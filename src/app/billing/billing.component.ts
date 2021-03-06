import { Component, OnInit, ViewChild, ElementRef, PLATFORM_ID, Inject, Renderer2 } from '@angular/core';
import { Subject, from, of, zip, fromEvent } from 'rxjs';
import { WizardStep } from '../wizard/models';
import { BillEditorShellComponent } from './bill-editor-shell/bill-editor-shell.component';
import { BillItemEditorShellComponent } from './bill-item-editor-shell/bill-item-editor-shell.component';
import { FriendsEditorShellComponent } from './friends-editor-shell/friends-editor-shell.component';
import { BillItemsAssignEditorShellComponent } from './bill-items-assign-editor-shell/bill-items-assign-editor-shell.component';
import { ExtraChargeEditorShellComponent } from './extra-charge-editor-shell/extra-charge-editor-shell.component';
import { ReceiptShellComponent } from './receipt-shell/receipt-shell.component';
import { BillingStoreService } from './billing-store.service';
import { BillsService } from '../bills/bills.service';
import { takeUntil, concatMap, mergeMap, tap, map, toArray, debounceTime } from 'rxjs/operators';
import { WizardService } from '../wizard/wizard.service';
import { Step, Orientations } from '../step-tracker/models';
import { Router } from '@angular/router';
import { PeopleService } from '../people/people.service';
import { Person } from '../people/person';
import { ExtraChargesShellComponent } from './extra-charges-shell/extra-charges-shell.component';
import { BillItemsShellComponent } from './bill-items-shell/bill-items-shell.component';
import { NotificationService } from '../notification/notification.service';
import { isPlatformBrowser } from '@angular/common';

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
    component: BillItemsShellComponent
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
    component: ExtraChargesShellComponent
  }, {
    id: 6,
    stepName: 'Review the split',
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

  @ViewChild('target', { static: true }) target: ElementRef;
  @ViewChild('parent', { static: true }) parent: ElementRef;

  leftPosition = 0;
  isBrowser: boolean;
  constructor(private billingStore: BillingStoreService, private billService: BillsService, private wizardService: WizardService, private router: Router, private peopleService: PeopleService, private notificationService: NotificationService, private renderer: Renderer2, @Inject(PLATFORM_ID) platformId: any) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.steps = this.wizardSteps.map((wizardStep, i) => {
      return {
        id: i + 1,
        name: wizardStep.stepName,
        isActive: wizardStep.isActive,
        isDone: wizardStep.isDone,
        onClick: () => {
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

    if (this.isBrowser) {
      fromEvent(window, 'resize')
        .pipe(
          debounceTime(200),
          takeUntil(this.destroyed$),
        ).subscribe(_ => {
          this.getCurrentStepPosition();
          for (let i = 1; i < this.currentStep; i++) {
            this.leftPosition = this.leftPosition - 133.33;
          }
        });
      this.getCurrentStepPosition();
    }
  }

  private getCurrentStepPosition() {
    const clientRect = this.target.nativeElement.getBoundingClientRect();
    const parent = this.parent.nativeElement.getBoundingClientRect();
    this.leftPosition = clientRect.left - parent.left;
  }

  onClickBack($event) {
    this.wizardService.tryGoBack({
      $event,
      back: (backData) => {
        this.leftPosition = this.leftPosition + 133.33;
        this.backCallback();
      }
    });
  }

  onClickNext($event) {
    this.wizardService.tryGoNext({
      $event,
      next: (nextData) => {
        if (this.currentStep == this.steps.length) {
          this.onSubmit();
        } else if (this.currentStep < this.steps.length) {
          this.leftPosition = this.leftPosition - 133.33;
          this.nextCallback();
        }
      }
    });
  }

  private onSubmit() {
    from(this.store.friends.filter(f => f.selected))
      .pipe(
        mergeMap((person: Person) => {
          return zip(
            of(person),
            this.peopleService.createPerson(person)
          )
            .pipe(map(([p, createdPerson]) => {
              return {
                person: p,
                createdPerson
              };
            }));
        }),
        toArray(),
        map(personMap => {
          return {
            personBillItems: this.store.personBillItems.map(pbi => {
              const person = personMap.find(pm => pm.person.id == pbi.assignee);
              return {
                itemId: pbi.itemId,
                assignee: person && person.createdPerson.id || 0
              };
            }),
            participants: this.store.friends.map(f => {
              const person = personMap.find(pm => pm.person.id == f.id);
              return {
                id: 0,
                person: {
                  id: person && person.createdPerson.id || 0
                }
              };
            })
          };
        }),
        concatMap((friendMaps) => {
          const updatedBill = {
            ...this.store.bill,
            ...{
              billItems: [...this.store.billItems.map(item => {
                const person = friendMaps.personBillItems.find(pbi => pbi.itemId == item.id);
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
              participants: friendMaps.participants
            }
          };

          return this.billService.createBill(updatedBill);
        })
      ).subscribe(createdBill => {
        this.notificationService.success({
          header: 'Bill created',
          message: 'Your bill has been successfully created and saved.',
          button: null
        });
        this.router.navigate(['/receipt', createdBill.externalId]);
      });
  }

  private nextCallback() {
    const updatedStep = this.getCurrentStep(1);
    this.currentStep = updatedStep;
    this.steps = this.updateSteps(this.currentStep);
  }

  private backCallback() {
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
