import { Component, OnInit } from '@angular/core';
import { Store } from '../../../node_modules/@ngrx/store';
import { AppActions, AppActionDel, AppActionUpdateSummary } from '../store/action';
import { CommonService } from '../common.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    templateUrl:'./summary.component.html'
})

export class SummaryComponent implements OnInit {
    dataToDisplay;
    betweenDate;
    form: FormGroup;
    owner;

    constructor(private store: Store<AppActions>, 
    private service: CommonService,
    private fb: FormBuilder) { 
        this.form = this.fb.group(
            {
                beginningDate : [],
                endDate: []
            }
        )
    }
    
    ngOnInit(){
       // this.store.select('AppReducer').subscribe(state => {
       //     this.dataToDisplay = state.dataList;

    //});

        // this.service.getSummary().subscribe(data => this.dataToDisplay = data);

        this.store.select('AppReducer').subscribe(state => {
            console.log('get owner', state.owner);
            this.owner = state.owner;
            console.log('state changed detected');
            console.log('state is', state);
            this.dataToDisplay = state.dataList;
          });
          //we have to pass in a JSON object!!!
          this.store.dispatch(new AppActionUpdateSummary({owner: this.owner}));
    }
    
    dateBetween(dateForm){
        
        this.service.getBetweenDate(dateForm).subscribe(data => {
                this.betweenDate = data; 
              /*  for(var i = 0; i<this.betweenDate.length; i++){
                    let solddate = new Date(this.betweenDate[i].DateSold);
                    let pdate = new Date(this.betweenDate[i].DatePurchased);
                    this.betweenDate[i].DateSold = solddate.getFullYear() + "-" + (solddate.getMonth() + 1) + "-" + solddate.getDay();
                    this.betweenDate[i].DatePurchased = pdate.getFullYear() + "-" + (pdate.getMonth() + 1) + "-" + pdate.getDay();
                   //this.betweenDate[i].DateSold = date.getDate();
                  // console.log(typeof solddate.getDate()); 
                }*/
        });
        
    }
}