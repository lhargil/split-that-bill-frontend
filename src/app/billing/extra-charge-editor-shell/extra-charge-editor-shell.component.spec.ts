import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraChargeEditorShellComponent } from './extra-charge-editor-shell.component';
import { FormsModule } from 'src/app/forms/forms.module';

describe('ExtraChargesEditorShellComponent', () => {
  let component: ExtraChargeEditorShellComponent;
  let fixture: ComponentFixture<ExtraChargeEditorShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExtraChargeEditorShellComponent],
      imports: [FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraChargeEditorShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
