import { Component, ViewChild, ComponentFactoryResolver, Input, Output, EventEmitter } from '@angular/core';
import { ContentHostDirective } from '../shared/directives/content-host/content-host.directive';
import { WizardStep } from './models';
import { WizardService } from './wizard.service';

@Component({
  selector: 'wizard[wizardSteps]',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss'],
})
export class WizardComponent {
  @ViewChild(ContentHostDirective, { static: true }) contentHost: ContentHostDirective;

  @Input() wizardSteps: WizardStep[];
  @Input()
  set currentStep(value: number) {
    this._currentStep = value;
    const wizardStep = this.wizardSteps.find(ws => ws.id == this._currentStep);
    this.loadComponent(wizardStep.component);
    window.scrollTo(0, 0);
    this.wizardService.currentStep(wizardStep);
  }

  get currentStep(): number {
    return this._currentStep;
  }

  @Output() clickBack = new EventEmitter<any>();
  @Output() clickNext = new EventEmitter<any>();

  private _currentStep: number;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private wizardService: WizardService) { }

  private loadComponent(component) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

    const viewContainerRef = this.contentHost.viewContainerRef;
    viewContainerRef.clear();

    viewContainerRef.createComponent(componentFactory);
  }

  onBack($event) {
    this.clickBack.emit($event);
  }

  onNext($event) {
    this.clickNext.emit($event);
  }
}
