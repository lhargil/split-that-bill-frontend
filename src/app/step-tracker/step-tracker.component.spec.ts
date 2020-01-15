import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepTrackerComponent } from './step-tracker.component';
import { Step } from './models';
import { SharedModule } from '../shared/shared.module';

describe('StepTrackerComponent', () => {
  let component: StepTrackerComponent;
  let fixture: ComponentFixture<StepTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StepTrackerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepTrackerComponent);
    component = fixture.componentInstance;
    component.steps = [{
      id: 1,
      name: 'Test step',
      isActive: true,
      isDone: false,
      onClick: eventData => { }
    } as Step];

    fixture.detectChanges();
  });

  it('should create', () => {
    console.log(component.steps);
    expect(component).toBeTruthy();
  });
});
