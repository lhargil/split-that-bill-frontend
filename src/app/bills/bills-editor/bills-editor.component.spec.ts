import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsEditorComponent } from './bills-editor.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BillsService } from '../bills.service';
import { BillsMockService } from '../stub/bills-mock.service';
import { PeopleService } from 'src/app/people/people.service';
import { PeopleMockService } from 'src/app/people/stub/people-mock.service';

describe('BillsEditorComponent', () => {
  let component: BillsEditorComponent;
  let fixture: ComponentFixture<BillsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BillsEditorComponent],
      providers: [
        { provide: BillsService, useClass: BillsMockService },
        { provide: PeopleService, useClass: PeopleMockService }
      ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
