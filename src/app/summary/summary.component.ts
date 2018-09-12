import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { Store } from '../../../node_modules/@ngrx/store';
import { AppActions, AppActionDel, AppActionUpdateSummary } from '../store/action';
import { ProductInterfaceImpl } from '../productService/productInterfaceImpl.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * @description Displays the summary information about user's purchase history in a table.
 * Also provides the ability to search for records between dates defined by user 
 */
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
    needToUpdateSummary;
    gainLoss;

    constructor(private store: Store<AppActions>,
        private service: ProductInterfaceImpl,
        private fb: FormBuilder) {
        this.form = this.fb.group(
            {
                beginningDate: [],
                endDate: []
            }
        )
    }

    ngOnInit() {
        //subscribe to the store to get the latest state
        this.store.select('AppReducer').subscribe(state => {
            console.log('get owner', state.owner);
            //get the owner information
            this.owner = state.owner;
            console.log('state changed detected');
            console.log('state is', state);
            //get the summary data
            this.dataToDisplay = state.summary;
            //
            this.needToUpdateSummary = state.needToUpdateSummary;
        });

        if (this.needToUpdateSummary && this.owner != 'none') {
            //dispatch the action to update the summary table
            this.store.dispatch(new AppActionUpdateSummary({ owner: this.owner }));
        }
    }

    //invoked when show button is clicked
    dateBetween(dateForm) {
        // dateForm.beginningDate = formatDate(dateForm.beginningDate, "short", "en-US").split(",")[0].replace("/", "-");
        // dateForm.endDate = formatDate(dateForm.endDate, "short", "en-US").split(",")[0].replace("/", "-");
        //get the records between the dates
        this.service.getBetweenDate(this.owner, dateForm).subscribe(data => {
            this.betweenDate = data;
            this.gainLoss = 0;
            data.forEach(element => {
                this.gainLoss += element[8];
            });
        });

    }

    //invoked when download button is clicked
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

    dateFormat(date) {
        return formatDate(date, "short", "en-US").split(",")[0];
      }
}