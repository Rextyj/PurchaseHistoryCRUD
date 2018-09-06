import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppActions, AppActionDel, AppActionUpd } from '../store/action';
import { CommonService } from '../service/common.service';

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

  constructor(private store: Store<AppActions>,
    private service: CommonService) {
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
    //dispatch a delete action/ payload is the id of the item and its owner
    this.store.dispatch(new AppActionDel({ 'id': id, owner: this.owner }));
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

}
