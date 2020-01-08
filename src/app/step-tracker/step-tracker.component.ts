import { Component, OnInit, Input } from '@angular/core';
import { Step, Config, Orientations } from './models';

@Component({
  selector: 'step-tracker[steps][config]',
  templateUrl: './step-tracker.component.html',
  styleUrls: ['./step-tracker.component.scss']
})
export class StepTrackerComponent implements OnInit {
  private _steps: Step[];
  @Input() set steps(list: Step[]) {
    const activeStep = list.find(item => item.isActive);
    this.currentStep = activeStep && activeStep.id || 1;
    this._steps = list;
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
}
