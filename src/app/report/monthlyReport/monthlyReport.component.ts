import { Component, OnInit } from '@angular/core';
import { ProductInterfaceImpl } from '../../productService/productInterfaceImpl.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state';

/**
 * Report component to show graphs
 */
@Component({
  selector: 'app-report',
  templateUrl: './monthlyReport.component.html',
  styleUrls: ['./monthlyReport.component.scss']
})
export class MonthlyReportComponent implements OnInit {

  monthlyData: number[] = [];
  companyData = [];
  owner;

  // lineChart variables
  public lineChartData: Array<any> = [{ data: [] }];
  public lineChartLabels: Array<any> = [];

  constructor(private service: ProductInterfaceImpl, private store: Store<AppState>) { }

  ngOnInit() {
    //grab the owner info on init and show the company grah automatically
    this.store.select('AppReducer').subscribe(state => {
      this.owner = state.owner;
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

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
