import { Component, OnInit } from '@angular/core';
import { Store } from '../../../node_modules/@ngrx/store';
import { AppActions, AppActionDel } from '../store/action';
import { CommonService } from '../common.service';

@Component({
    templateUrl:'./summary.component.html'
})

export class SummaryComponent implements OnInit {
    dataToDisplay;
    constructor(private store: Store<AppActions>, 
    private service: CommonService) { }
    ngOnInit(){
       // this.store.select('AppReducer').subscribe(state => {
       //     this.dataToDisplay = state.dataList;

    //});
        this.service.getSummary().subscribe(data => this.dataToDisplay = data);
    }
   
}