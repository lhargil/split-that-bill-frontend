import { Component, OnInit, ViewChild, ComponentFactoryResolver, Input } from '@angular/core';
import { Step, Orientations, Config } from '../step-tracker/models';
import { ContentHostDirective } from '../shared/directives/content-host.directive';
import { WizardStep } from './models';
import { WizardService } from './wizard.service';

@Component({
  selector: 'wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {
  @ViewChild(ContentHostDirective, { static: true }) contentHost: ContentHostDirective;

  @Input() wizardSteps: WizardStep[];
  @Input() config: Config;

  private wizardStep: WizardStep;

  currentStep = 1;
  steps: Step[] = [];
  orientations = Orientations;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private wizardService: WizardService) { }

  ngOnInit() {
    this.steps = this.wizardSteps.map((wizardStep, i) => {
      return {
        id: i + 1,
        name: wizardStep.stepName,
        isActive: wizardStep.isActive,
        isDone: wizardStep.isDone,
        onClick: (eventData) => this.onNext(eventData)
      } as Step;
    });
    this.loadComponent(this.currentStep);
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
      next: (nextData) => this.nextCallback(nextData)
    });
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
