import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Step, Orientations } from '../step-tracker/models';
import { ContentHostDirective } from './content-host.directive';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {
  @ViewChild(ContentHostDirective, { static: true }) contentHost: ContentHostDirective;

  steps: Step[] = [];
  orientations = Orientations;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.steps = Array.from({ length: 5 }, (_, i) => {
      return {
        id: i + 1,
        name: `Step ${i + 1}`,
        isActive: i == 2,
        isDone: false,
        onClick: (eventData) => {
          console.log('clicked: ', eventData.step.name);
        }
      };
    });
  }

}
