import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wizard-nav',
  templateUrl: './wizard-nav.component.html',
  styleUrls: ['./wizard-nav.component.scss']
})
export class WizardNavComponent implements OnInit {
  steps = [];
  constructor() { }

  ngOnInit() {
    this.steps = Array.from({ length: 5 }, (_, i) => {
      return {
        id: i + 1,
        name: `Step ${i + 1}`
      };
    });
  }

}
