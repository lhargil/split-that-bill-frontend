import { Component, OnInit, Input } from '@angular/core';
import { Step, Config, Orientations } from './models';

@Component({
  selector: 'step-tracker[steps][config]',
  templateUrl: './step-tracker.component.html',
  styleUrls: ['./step-tracker.component.scss']
})
export class StepTrackerComponent implements OnInit {
  private _steps: Step[];
  @Input() set steps(value: Step[]) {
    this._steps = [...value];
    const activeStep = this._steps.find(item => item.isActive);
    this.currentStep = activeStep && activeStep.id || 1;
  }

  get steps() {
    return this._steps;
  }

  @Input() config = { orientation: Orientations.horizontal };

  currentStep: number;
  orientations = Orientations;
  constructor() { }

  ngOnInit() {
  }

  goto($event, step: Step) {
    $event.preventDefault();
    this.currentStep = step.id;
    step.onClick({ $event, step });
  }

  trackByFn(index, item: Step) {
    return item.id;
  }
}
