import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsEditorShellComponent } from './friends-editor-shell.component';
import { FormsModule } from 'src/app/forms/forms.module';

describe('FriendsEditorShellComponent', () => {
  let component: FriendsEditorShellComponent;
  let fixture: ComponentFixture<FriendsEditorShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FriendsEditorShellComponent],
      imports: [FormsModule]
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
