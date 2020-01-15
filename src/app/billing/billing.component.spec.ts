import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingComponent } from './billing.component';
import { RouterTestingModule } from '@angular/router/testing';
import { WizardModule } from '../wizard/wizard.module';
import { FriendsEditorShellComponent } from './friends-editor-shell/friends-editor-shell.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '../forms/forms.module';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

describe('BillingComponent', () => {
  let component: BillingComponent;
  let fixture: ComponentFixture<BillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BillingComponent, FriendsEditorShellComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        WizardModule,
        RouterTestingModule
      ],
    })
      .overrideModule(BrowserDynamicTestingModule, { set: { entryComponents: [FriendsEditorShellComponent] } })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
