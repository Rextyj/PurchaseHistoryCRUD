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

  monthlyData:number[] = [];
  companyData = [];
  owner;
  // lineChart
  public lineChartData:Array<any> = [{data: []}];
  public lineChartLabels:Array<any> = [];
  public barChartData:Array<any> = [{data: []}];
  public barChartLabels:Array<any> = [];
  constructor(private service: ProductInterfaceImpl, private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('AppReducer').subscribe(state => {
      this.owner = state.owner;
      this.onShowByCompany();
    });
  }

  
  
  public lineChartOptions:any = {
    responsive: true,
    scales: {
      xAxes: [{
        scaleLabel: {
          display:true,
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
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
    //,
    // { // dark grey
    //   backgroundColor: 'rgba(77,83,96,0.2)',
    //   borderColor: 'rgba(77,83,96,1)',
    //   pointBackgroundColor: 'rgba(77,83,96,1)',
    //   pointBorderColor: '#fff',
    //   pointHoverBackgroundColor: '#fff',
    //   pointHoverBorderColor: 'rgba(77,83,96,1)'
    // },
    // { // grey
    //   backgroundColor: 'rgba(148,159,177,0.2)',
    //   borderColor: 'rgba(148,159,177,1)',
    //   pointBackgroundColor: 'rgba(148,159,177,1)',
    //   pointBorderColor: '#fff',
    //   pointHoverBackgroundColor: '#fff',
    //   pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    // }
  ];
  public lineChartLegend:boolean = false;
  public lineChartType:string = 'line';
 
  // public randomize():void {
  //   let _lineChartData:Array<any> = new Array(this.lineChartData.length);
  //   for (let i = 0; i < this.lineChartData.length; i++) {
  //     _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
  //     for (let j = 0; j < this.lineChartData[i].data.length; j++) {
  //       _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
  //     }
  //   }
  //   this.lineChartData = _lineChartData;
  // }
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  onShowMonthly(year){
    this.service.getMonthlyData(this.owner, year).subscribe(_data => {
      console.log("monthly data is ", _data);
      this.monthlyData = [];
      this.lineChartLabels.length = 0;
      for(let row of _data){
        this.monthlyData.push(row[1]);
        this.lineChartLabels.push(row[0]);
      }
      console.log("data is ", this.monthlyData);
      console.log('label is ', this.lineChartLabels);
      this.lineChartData = [
        {data: this.monthlyData}
      ];
    });
  }

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      xAxes: [{
        scaleLabel: {
          display:true,
          labelString: 'Company Name'
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
  // public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = false;
 
  // public barChartData:any[] = [
  //   {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
  //   {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  // ];

  onShowByCompany(){
    this.service.getCompanyData(this.owner).subscribe(_data => {
      console.log("monthly data is ", _data);
      for(let row of _data){
        this.companyData.push(row[1]);
        this.barChartLabels.push(row[0]);
      }
      console.log("data is ", this.monthlyData);
      this.barChartData = [
        {data: this.barChartLabels}
      ];
    });
  }
}
