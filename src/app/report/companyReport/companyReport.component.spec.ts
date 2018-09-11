import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyReportComponent } from './companyReport.component';

describe('ReportComponent', () => {
  let component: CompanyReportComponent;
  let fixture: ComponentFixture<CompanyReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
