import { Component, OnInit } from '@angular/core';
import { Store } from '../../../node_modules/@ngrx/store';
import { AppActions, AppActionDel, AppActionUpd } from '../store/action';
import { CommonService } from '../common.service';



@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']

})
export class DisplayComponent implements OnInit {
  dataToDisplay: any[];
  currentState;
  owner;
  constructor(private store: Store<AppActions>,
    private service: CommonService) {
    
  }

  ngOnInit() {
    //then we dispatch the update action with owner info as payload
    //effect will intercept the action
    
    
    this.store.select('AppReducer').subscribe(state => {
      console.log('get owner', state.owner);
      this.owner = state.owner;
      console.log('state changed detected');
      console.log('state is', state);
      this.dataToDisplay = state.dataList;
      this.currentState = state.dataList;
    });
    //we have to pass in a JSON object!!!
    /*
      any dispatch action will trigger subscription updates
    */
   console.log('about to dispatch update with owner ', this.owner);
    this.store.dispatch(new AppActionUpd({owner: this.owner}));

    // this.service.GetPurchase({owner: this.owner}).subscribe(data => {
    //   console.log("returned data is ", data);
    //   this.dataToDisplay = data;
    // });
  }

  deleteItem(id) {
    //dispatch a delete action/ payload is the id 
    console.log('Item id is ' + id);
    this.store.dispatch(new AppActionDel({'id': id, owner: this.owner }));
    // this.service.deletePurchase({id: id, owner: this.owner}).subscribe(data => console.log(data));
  }

  filterByCompanyName(param) {
    console.log('passed in filter is ', param);
    /*
      filter again should be using the currentState
    */
    this.dataToDisplay = this.currentState.filter(item => {
      if (item.CompanyName === param) {
        console.log('return true');
        return true;
      } else {
        return false;
      }
    });
    console.log('filtered result is ', this.dataToDisplay);
  }

  filterByDate(param){
    console.log(this.dataToDisplay);
    this.dataToDisplay = this.currentState.filter(item => {
      var date = new Date(item.DatePurchased);
      var month = date.getMonth() + 1;
      if(month == param){
        return true;
      } else {
        return false;
      }
    });
  }

  resetFilter() {
    this.dataToDisplay = this.currentState;
  }

  filterByText(param) {
    this.service.getSearchResult(param).subscribe(data => {
      console.log('display comp gets ', data);
      this.dataToDisplay = data;
    });
  }

}
