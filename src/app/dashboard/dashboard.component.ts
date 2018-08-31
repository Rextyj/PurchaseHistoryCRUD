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
  styleUrls: ['./dashboard.component.scss'],
  providers: [],
  animations: [fadeAnimation, slideAnimation]
})
export class DashboardComponent implements OnInit {
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
    private router: Router) {
  }

  ngOnInit() {
    //show the add component by default when user first logged in
    this.onAdd();
  }

  //invoked when the user clicks view tab
  onView() {
    this.router.navigate(['/dashboard', { outlets: { 'childrenComponents': 'display' } }]);
  }

  //invoked when the user clicks add tab
  onAdd() {
    this.router.navigate(['/dashboard', { outlets: { 'childrenComponents': 'additem' } }]);
  }

  //invoked when the user clicks summary tab
  onSummary() {
    this.router.navigate(['/dashboard', { outlets: { 'childrenComponents': 'summary' } }]);

  }

  //invoked when the user clicks logout button
  onLogout() {
    //dispatch a logout action to rest the state
    this.store.dispatch(new AppActionLogout());
    this.router.navigateByUrl('/login');
  }
}
