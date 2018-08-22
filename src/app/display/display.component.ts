import { Component, OnInit } from '@angular/core';
import { Store } from '../../../node_modules/@ngrx/store';
import { AppActions, AppActionDel } from '../store/action';
import { CommonService } from '../common.service';


@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  dataToDisplay: any[];
  currentState;
  constructor(private store: Store<AppActions>,
              private service: CommonService) { }

  ngOnInit() {
    this.store.select('AppReducer').subscribe(state => {
      console.log('state changed detected');
      this.dataToDisplay = state.dataList;
      this.currentState = state.dataList;
    });
  }

  deleteItem(id) {
    //dispatch a delete action/ payload is the id 
    console.log('Item id is ' + id);
    this.store.dispatch(new AppActionDel(id));
  }

  filterResult(param){
    console.log('passed in filter is ', param);
    /*
      filter again should be using the currentState
    */
    this.dataToDisplay = this.currentState.filter(item => {
      if (item.CompanyName === param){
        console.log('return true');
        return true;
      } else {
        return false;
      }
    });
    console.log('filtered result is ', this.dataToDisplay);
  }

  resetFilter(){
    this.dataToDisplay = this.currentState;
  }

  filterByText(param){
    this.service.getSearchResult(param).subscribe(data => {
      console.log('display comp gets ', data);
      this.dataToDisplay = data;
    });
  }

}
