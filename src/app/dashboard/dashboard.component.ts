import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonService } from '../service/common.service';
import { Store, State } from '@ngrx/store';
import { AppState } from '../store/state';
import { AppActions, AppActionLogout } from '../store/action';
import { Router } from '@angular/router';
import { fadeAnimation } from '../animations';
import { slideAnimation } from '../animations';

/**
 * @description A component that contains the outlet for all data related components,
 * user can click the tab bar to freely view other components
 */

@Component({
  // selector: 'app-root',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ],
  providers: [],
  animations: [fadeAnimation,slideAnimation]
})
export class DashboardComponent implements OnInit{
  //variable declaration
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

  ngOnInit() {
    //show the add component by default when user first logged in
    this.onAdd();
    // //subscribe to the ngrx store to get the current state of the app
    // this.store.select('AppReducer').subscribe(state => {
    //   console.log('dashboard gets state ', state);
    //   this.owner = state.owner;
    // });
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
