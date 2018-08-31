import { Component, OnInit } from '@angular/core';
import { Store } from '../../../node_modules/@ngrx/store';
import { AppActions, AppActionDel, AppActionUpdateSummary } from '../store/action';
import { CommonService } from '../service/common.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    templateUrl: './summary.component.html'
})

export class SummaryComponent implements OnInit {
    dataToDisplay;
    betweenDate;
    form: FormGroup;
    owner;
    res;
    fileUrl;

    constructor(private store: Store<AppActions>,
        private service: CommonService,
        private fb: FormBuilder) {
        this.form = this.fb.group(
            {
                beginningDate: [],
                endDate: []
            }
        )
    }

    ngOnInit() {
        this.store.select('AppReducer').subscribe(state => {
            console.log('get owner', state.owner);
            this.owner = state.owner;
            console.log('state changed detected');
            console.log('state is', state);
            this.dataToDisplay = state.dataList;
        });
        //we have to pass in a JSON object!!!
        this.store.dispatch(new AppActionUpdateSummary({ owner: this.owner }));
    }

    dateBetween(dateForm) {

        this.service.getBetweenDate(this.owner,dateForm).subscribe(data => {
            this.betweenDate = data;
        });

    }

    onDownload() {
        this.res = this.service.convertToCSV(this.dataToDisplay);
        var blob = new Blob([this.res], { type: 'application/summary' });
        this.fileUrl = window.URL.createObjectURL(blob);
        var aTag = document.createElement('a');
        console.log(this.fileUrl);
        aTag.href = this.fileUrl;
        aTag.download = 'summary.csv';
        aTag.hidden = true;
        aTag.click();
    }
}