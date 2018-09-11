import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppActions, AppActionDel, AppActionUpd } from '../store/action';
import { ProductInterfaceImpl } from '../productService/productInterfaceImpl.service';
import { formatDate } from '@angular/common';
/**
 * @description A component to display all the records belong to the user currently logged in,
 * in a table. Also privides filtering functionalities through company name and month
 */
@Component({
  selector: 'app-display',
  templateUrl: './viewItems.component.html',
  styleUrls: ['./viewItems.component.css']

})
export class ItemDisplayComponent implements OnInit {

  dataToDisplay: any[];
  currentState;
  owner;
  needToUpdate;
  res;
  fileUrl;

  constructor(private store: Store<AppActions>,
    private service: ProductInterfaceImpl) {
  }

  ngOnInit() {
    //subscribe to the ngrx store to get the current state of the app
    this.store.select('AppReducer').subscribe(state => {
      console.log('get owner', state.owner);
      this.owner = state.owner;
      console.log('state changed detected');
      console.log('state is', state);
      this.needToUpdate = state.needToUpdate;
      this.dataToDisplay = state.dataList;
      this.currentState = state.dataList;
    });

    //check if we need to make an API call
    if (this.needToUpdate) {
      /*
        any dispatch action will trigger subscription updates
      */
      console.log('about to dispatch update with owner ', this.owner);
      //dispatch an action to update the state
      this.store.dispatch(new AppActionUpd({ owner: this.owner }));

    }
  }

  //invoked when the user clicks on the trash can icon
  deleteItem(id) {
    console.log('Item id is ' + id);
    // ask for confirmation first
    if(window.confirm('Are you sure you want to delete this record?')){
      //dispatch a delete action/ payload is the id of the item and its owner
    this.store.dispatch(new AppActionDel({ 'id': id, owner: this.owner }));
    }
  }

  //invoked when user clicks search by company button
  filterByCompanyName(param) {
    console.log('passed in filter is ', param);
    /*
      filter should be using the currentState
      Assign the filtered results to the dataToDisplay array
    */
    this.dataToDisplay = this.currentState.filter(item => {
      if (item.companyName === param) {
        console.log('return true');
        return true;
      } else {
        return false;
      }
    });
    console.log('filtered result is ', this.dataToDisplay);
  }

  //invoked when user clicks search by month button
  filterByDate(param) {
    console.log(this.dataToDisplay);
    this.dataToDisplay = this.currentState.filter(item => {
      var date = new Date(item.datePurchased);
      var month = date.getMonth() + 1;
      if (month == param) {
        return true;
      } else {
        return false;
      }
    });
  }

  //invoked when user clicks display all button
  resetFilter() {
    //reset the dataToDisplay array to the state
    this.dataToDisplay = this.currentState;
  }

  // invoked when download button is pressed
  onDownload() {
    this.res = this.service.convertToCSV(this.currentState);
    // storing the CSV string to a blob
    var blob = new Blob([this.res], { type: 'application/history' });
    // create a url for the blob
    this.fileUrl = window.URL.createObjectURL(blob);
    // create a <a> tag and set the href to the url just created
    var aTag = document.createElement('a');
    console.log(this.fileUrl);
    aTag.href = this.fileUrl;
    aTag.download = 'history.csv';
    aTag.hidden = true;
    //programally click the <a> tag to trigger a download action
    aTag.click();
  }

  dateFormat(date) {
    if (date != undefined){
      return formatDate(date, "short", "en-US").split(",")[0];
    } else {
      return '';
    }
    
  }
}
