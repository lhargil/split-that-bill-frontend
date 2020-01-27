import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeHeaderComponent } from './home-header.component';
import { NavComponent } from '../fixed-nav/nav.component';
import { MenuComponent } from '../menu/menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FloatieNavModule } from '../floatie-nav/floatie-nav.module';

describe('HeaderComponent', () => {
  let component: HomeHeaderComponent;
  let fixture: ComponentFixture<HomeHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeHeaderComponent,
        NavComponent,
        MenuComponent
      ],
      imports: [
        RouterTestingModule,
        FloatieNavModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
