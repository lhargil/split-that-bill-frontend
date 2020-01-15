import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillItemsEditorShellComponent } from './bill-items-editor-shell.component';
import { FormsModule } from 'src/app/forms/forms.module';

describe('BillItemsEditorShellComponent', () => {
  let component: BillItemsEditorShellComponent;
  let fixture: ComponentFixture<BillItemsEditorShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BillItemsEditorShellComponent],
      imports: [FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillItemsEditorShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
