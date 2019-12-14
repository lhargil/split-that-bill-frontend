import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsListComponent } from './bills-list.component';
import { BillsService } from '../bills.service';
import { BillsMockService } from '../stub/bills-mock.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('BillsListComponent', () => {
  let component: BillsListComponent;
  let fixture: ComponentFixture<BillsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BillsListComponent],
      providers: [
        { provide: BillsService, useClass: BillsMockService }
      ],
      imports: [
        RouterTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
