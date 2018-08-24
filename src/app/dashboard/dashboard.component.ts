import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonService } from '../common.service';
import { Store, State } from '@ngrx/store';
import { AppState } from '../store/state';
import { AppActions, AppActionLogout } from '../store/action';
import { listEffect } from '../store/effect';
import { Router } from '@angular/router';

@Component({
  // selector: 'app-root',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ],
  providers: []
})
export class DashboardComponent implements OnInit{
  // name = 'Angular';

  form: FormGroup;
  savedData: Array<Object> = [];
  output = [];
  res = '';
  fileUrl;
  dataFromStore;
  owner;

  constructor(private fb: FormBuilder, private domSan: DomSanitizer, 
    private newService: CommonService, private store: Store<AppState>,
    private router: Router){
  }

  // //reading all the records belongs to the user from the database
  ngOnInit() {
    this.onAdd();
    this.store.select('AppReducer').subscribe(state => {
      //fitst login page updated the state with the user
      console.log('dashboard gets state ', state);
      this.owner = state.owner;
    });
  }

  onView(){
    // this.router.navigateByUrl('/display');
    this.router.navigate(['/dashboard', {outlets: {'childrenComponents': 'display'}}]);
  }

  onAdd(){
    this.router.navigate(['/dashboard', {outlets: {'childrenComponents': 'additem'}}]);
  }


  onSummary(){
    this.router.navigate(['/dashboard',{outlets:{'childrenComponents':'summary'}}]);

  }

  onLogout(){
    this.store.dispatch(new AppActionLogout());
    this.router.navigateByUrl('/login');
  }
}
