import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatieNavComponent } from './floatie-nav.component';

describe('FloatieNavComponent', () => {
  let component: FloatieNavComponent;
  let fixture: ComponentFixture<FloatieNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloatieNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatieNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
