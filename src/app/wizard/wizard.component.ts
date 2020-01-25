import { Component, OnInit, ViewChild, ComponentFactoryResolver, Input, OnDestroy } from '@angular/core';
import { Step, Orientations, Config } from '../step-tracker/models';
import { ContentHostDirective } from '../shared/directives/content-host.directive';
import { WizardStep } from './models';
import { WizardService } from './wizard.service';
import { BillingStoreService } from '../billing/billing-store.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { BillsService } from '../bills/bills.service';

@Component({
  selector: 'wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit, OnDestroy {
  @ViewChild(ContentHostDirective, { static: true }) contentHost: ContentHostDirective;

  @Input() wizardSteps: WizardStep[];
  @Input() config: Config;

  private wizardStep: WizardStep;
  private destroyed$ = new Subject();

  currentStep = 1;
  steps: Step[] = [];
  orientations = Orientations;
  hideNav = true;
  store: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private wizardService: WizardService, private billingStore: BillingStoreService, private billService: BillsService) { }

  ngOnInit() {
    this.steps = this.wizardSteps.map((wizardStep, i) => {
      return {
        id: i + 1,
        name: wizardStep.stepName,
        isActive: wizardStep.isActive,
        isDone: wizardStep.isDone,
        onClick: (eventData) => {
          if (eventData.step.id <= this.currentStep) {
            this.onBack(eventData.$event);
          } else if (eventData.step.id > this.currentStep) {
            this.onNext(eventData.$event);
          }
        }
      } as Step;
    });
    this.loadComponent(this.currentStep);

    this.billingStore.store$
      .pipe(
        takeUntil(this.destroyed$)
      ).subscribe(store => {
        this.store = store;
      });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  loadComponent(step) {
    this.wizardStep = this.wizardSteps.find(ws => ws.id == step);

    if (this.wizardStep == null) return;

    this.wizardService.currentStep(this.wizardStep);

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.wizardStep.component);

    const viewContainerRef = this.contentHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
  }

  onBack($event) {
    this.wizardService.tryGoBack({
      $event,
      back: (backData) => this.backCallback(backData)
    });
  }

  onNext($event) {
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

  onSubmit() {
    console.log('submitting');

    const updatedBill = {
      ...this.store.bill,
      // ...{
      //   billDate: new Date(Date.UTC(billForm.get('billDateYear').value,
      //     billForm.get('billDateMonth').value - 1,
      //     billForm.get('billDateDay').value))
      // },
      ...{
        billItems: [...this.store.billItems]
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
      // ...{
      //   billItems: this.billItems.value.map(item => {
      //     return {
      //       id: item.id,
      //       description: item.description,
      //       amount: item.amount,
      //       discount: Number(item.discount) > 0 ? Number(item.discount) : null
      //     };
      //   }),
      //   ...{
      //     extraCharges: this.extraCharges.value.map(ec => {
      //       return {
      //         id: ec.id,
      //         description: ec.description,
      //         rate: Number(ec.rate) / 100
      //       };
      //     })
      //   },
      // }
    };
    console.log('updated Bill: ', updatedBill);
    this.billService.createBill(updatedBill)
      .subscribe();
  }

  toggleNav($event) {

  }

  private nextCallback(nextData) {
    this.currentStep = this.getCurrentStep(1);
    this.steps = this.steps.map(step => {
      return {
        ...step,
        isDone: step.id < this.currentStep,
        isActive: step.id == this.currentStep
      };
    });
    this.loadComponent(this.currentStep);
  }

  private backCallback(backData) {
    this.currentStep = this.getCurrentStep(-1);
    this.steps = this.steps.map(step => {
      return {
        ...step,
        isDone: step.id < this.currentStep,
        isActive: step.id == this.currentStep
      };
    });
    this.loadComponent(this.currentStep);
  }

  private getCurrentStep(step: number) {
    return this.currentStep + step <= this.steps.length ? this.currentStep + step : this.currentStep;
  }
}
