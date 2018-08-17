import { Component, OnInit } from '@angular/core';
import { Store } from '../../../node_modules/@ngrx/store';
import { AppActions, AppActionDel } from '../store/action';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  dataToDisplay;
  constructor(private store: Store<AppActions>) { }

  ngOnInit() {
    this.store.select('AppReducer').subscribe(state => {
      console.log('state changed detected');
      this.dataToDisplay = state.dataList;
    });
  }

  deleteItem(id) {
    //dispatch a delete action/ payload is the id 
    console.log('Item id is ' + id);
    this.store.dispatch(new AppActionDel(id));
  }

}
