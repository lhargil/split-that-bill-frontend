import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillItemsAssignEditorShellComponent } from './bill-items-assign-editor-shell.component';
import { FormsModule } from 'src/app/forms/forms.module';

describe('BillItemsAssignEditorShellComponent', () => {
  let component: BillItemsAssignEditorShellComponent;
  let fixture: ComponentFixture<BillItemsAssignEditorShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BillItemsAssignEditorShellComponent],
      imports: [FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillItemsAssignEditorShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
