import { Component, OnInit } from '@angular/core';
import { ProductInterfaceImpl } from '../../productService/productInterfaceImpl.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state';

/**
 * Report component to show graphs
 */
@Component({
  selector: 'app-report',
  templateUrl: './shareReport.component.html',
  styleUrls: ['./shareReport.component.scss']
})
export class ShareReportComponent implements OnInit {

  monthlyData: number[] = [];
  companyData = [];
  owner;

  // lineChart variables
  public barChartData: Array<any> = [{ data: [] }];
  public barChartLabels: Array<any> = [];

  constructor(private service: ProductInterfaceImpl, private store: Store<AppState>) { }

  ngOnInit() {
    //grab the owner info on init and show the company grah automatically
    this.store.select('AppReducer').subscribe(state => {
      this.owner = state.owner;
      this.onShowByShare();
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
  onShowByShare() {
    this.service.getShareData(this.owner).subscribe(_data => {
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
