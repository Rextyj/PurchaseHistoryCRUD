import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyReportComponent } from './monthlyReport.component';

describe('ReportComponent', () => {
  let component: MonthlyReportComponent;
  let fixture: ComponentFixture<MonthlyReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
