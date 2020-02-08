import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillItemEditorShellComponent } from './bill-item-editor-shell.component';
import { FormsModule } from 'src/app/forms/forms.module';

describe('BillItemsEditorShellComponent', () => {
  let component: BillItemEditorShellComponent;
  let fixture: ComponentFixture<BillItemEditorShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BillItemEditorShellComponent],
      imports: [FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillItemEditorShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
