import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { WizardService } from 'src/app/wizard/wizard.service';

@Component({
  selector: 'app-bill-items-assign-editor-shell',
  templateUrl: './bill-items-assign-editor-shell.component.html',
  styles: []
})
export class BillItemsAssignEditorShellComponent implements OnInit {
  billItemsForm: FormGroup;
  constructor(private wizardService: WizardService, private fb: FormBuilder) {
    this.billItemsForm = this.fb.group({
      billItems: this.fb.array([this.fb.group({
        itemId: [0],
        itemDescription: [''],
        amount: [0],
        currency: ['MYR'],
        priceWithCharges: [0],
        assignee: [0]
      })])
    });
  }

  ngOnInit() {
  }

}
