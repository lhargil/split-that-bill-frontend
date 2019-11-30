import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatieNavComponent } from './floatie-nav.component';
import { MenuComponent } from '../menu/menu.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('FloatieNavComponent', () => {
  let component: FloatieNavComponent;
  let fixture: ComponentFixture<FloatieNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloatieNavComponent, MenuComponent ],
      imports: [
        RouterTestingModule
      ]
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
