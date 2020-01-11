import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Step, Orientations } from '../step-tracker/models';
import { ContentHostDirective } from '../shared/directives/content-host.directive';

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
    this.loadComponent();
  }

  loadComponent() {
    //   // this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;
    //   // const adItem = this.ads[this.currentAdIndex];

    //   const componentFactory = this.componentFactoryResolver.resolveComponentFactory(SampleEditorComponent);

    //   const viewContainerRef = this.contentHost.viewContainerRef;
    //   viewContainerRef.clear();

    //   const componentRef = viewContainerRef.createComponent(componentFactory);
    //   // (<SampleEditorComponent>componentRef.instance).data = adItem.data;
  }

  onCancel($event) {
    console.log('Cancel clicked');
  }

  onSave($event) {
    console.log('Save clicked');
  }
}
