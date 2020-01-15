import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsFormComponent } from './friends-form.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('FriendsFormComponent', () => {
  let component: FriendsFormComponent;
  let fixture: ComponentFixture<FriendsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FriendsFormComponent],
      imports: [ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
