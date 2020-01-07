import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'step-tracker',
  templateUrl: './step-tracker.component.html',
  styleUrls: ['./step-tracker.component.scss']
})
export class StepTrackerComponent implements OnInit {
  steps = [];
  currentStep = 2;
  constructor() { }

  ngOnInit() {
    this.steps = Array.from({ length: 5 }, (_, i) => {
      return {
        id: i + 1,
        name: `Step ${i + 1}`
      };
    });
  }

  goto($event, step: number) {
    $event.preventDefault();
    this.currentStep = step;
  }
}
