import { Component, OnInit } from '@angular/core';
import { ProductInterfaceImpl } from '../productService/productInterfaceImpl.service';
import { Store } from '@ngrx/store';
import { AppState } from '../store/state';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  monthlyData: number[] = [];
  companyData = [];
  owner;

  // lineChart variables
  public lineChartData: Array<any> = [{ data: [] }];
  public lineChartLabels: Array<any> = [];
  //barchart variables
  public barChartData: Array<any> = [{ data: [] }];
  public barChartLabels: Array<any> = [];

  constructor(private service: ProductInterfaceImpl, private store: Store<AppState>) { }

  ngOnInit() {
    //grab the owner info on init and show the company grah automatically
    this.store.select('AppReducer').subscribe(state => {
      this.owner = state.owner;
      this.onShowByCompany();
    });
  }

  //---------------------------------Configuring linechart-------------------------------------
  public lineChartOptions: any = {
    responsive: true,
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Month'
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Total Purchase Price'
        }
      }]
    }
  };

  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = false;
  public lineChartType: string = 'line';

  //push data returned from server to the arrays to display
  onShowMonthly(year) {
    this.service.getMonthlyData(this.owner, year).subscribe(_data => {
      console.log("monthly data is ", _data);
      this.monthlyData = [];
      this.lineChartLabels.length = 0;
      for (let row of _data) {
        this.monthlyData.push(row[1]);
        this.lineChartLabels.push(row[0]);
      }
      console.log("data is ", this.monthlyData);
      console.log('label is ', this.lineChartLabels);
      this.lineChartData = [
        { data: this.monthlyData }
      ];
    });
  }

  //-------------------------------------configuring barchart---------------------------------------
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Company Name'
        },
        //show every xAxes labels
        ticks: {
          autoSkip: false
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Total Purchase Price'
        }
      }]
    }
  };

  public barChartType: string = 'bar';
  public barChartLegend: boolean = false;

  //push data returned from server to the arrays to display
  onShowByCompany() {
    this.service.getCompanyData(this.owner).subscribe(_data => {
      console.log("monthly data is ", _data);
      for (let row of _data) {
        this.companyData.push(row[1]);
        this.barChartLabels.push(row[0]);
      }
      console.log("data is ", this.monthlyData);
      this.barChartData = [
        { data: this.companyData }
      ];
    });
  }


  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
