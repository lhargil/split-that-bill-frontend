import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsEditorShellComponent } from './friends-editor-shell.component';

describe('FriendsEditorShellComponent', () => {
  let component: FriendsEditorShellComponent;
  let fixture: ComponentFixture<FriendsEditorShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsEditorShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsEditorShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
