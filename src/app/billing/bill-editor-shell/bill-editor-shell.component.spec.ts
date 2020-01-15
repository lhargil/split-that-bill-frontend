import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillEditorShellComponent } from './bill-editor-shell.component';
import { FormsModule } from 'src/app/forms/forms.module';

describe('BillEditorShellComponent', () => {
  let component: BillEditorShellComponent;
  let fixture: ComponentFixture<BillEditorShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BillEditorShellComponent],
      imports: [FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillEditorShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
