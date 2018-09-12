import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductInterfaceImpl } from '../productService/productInterfaceImpl.service';
import { Store, State } from '@ngrx/store';
import { AppState } from '../store/state';
import { AppActions, AppActionLogout, AppActionAssignOwner } from '../store/action';
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
  // variable declaration
  form: FormGroup;
  savedData: Array<Object> = [];
  output = [];
  res = '';
  fileUrl;
  dataFromStore;
  owner;
  monthIsActive;
  companyIsActive;
  dropdownItems;
  selectedDropdownItem;

  constructor(private fb: FormBuilder, private domSan: DomSanitizer,
    private newService: ProductInterfaceImpl, private store: Store<AppState>,
    private router: Router) {
  }

  ngOnInit() {
    // show the add component by default when user first logged in
    this.onAdd();
    this.dropdownItems = ['Report by Month','Report by Company', 'Report by Share'];
    /**
    everytime the user refreshes the page, we want the owner of this session to be automatically assigned
    with the username stored in the session storage

      if(sessionStorage.getItem("user")){
        console.log("it is stored");
        //assign the owner in the state to the username stored in the session storage
        this.store.dispatch(new AppActionAssignOwner(sessionStorage.getItem("user")));
      }
      but this is not safe! User can edit the username information in the session storage
    */

    //If the owner information of the current state is empty, redirect user to the login page
    this.store.select("AppReducer").subscribe(state => {
      this.owner = state.owner;
      if (state.owner === "none") {
        this.router.navigateByUrl("/login");
      }
    })

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

  onReport(message) {
    if (message == this.dropdownItems[0]){
      this.selectedDropdownItem = this.dropdownItems[0];
      this.router.navigate(['/dashboard', { outlets: { 'childrenComponents': 'report/monthlyReport' } }]);
    } else if (message == this.dropdownItems[1]){
      this.selectedDropdownItem = this.dropdownItems[1];
      this.router.navigate(['/dashboard', { outlets: { 'childrenComponents': 'report/companyReport' } }]);
    } else if( message == this.dropdownItems[2] ){
      this.selectedDropdownItem = this.dropdownItems[2];
      this.router.navigate(['/dashboard', { outlets: { 'childrenComponents': 'report/shareReport' } }]);
    }
  }

  //---------another way of making dropdown items active on the fly-----------
  // onMonthlyReport() {
  //   this.monthIsActive = true;
  //   this.companyIsActive = false;
  //   this.router.navigate(['/dashboard', { outlets: { 'childrenComponents': 'report/monthlyReport' } }]);
  // }

  // onCompanyReport() {
  //   this.monthIsActive = false;
  //   this.companyIsActive = true;
  //   this.router.navigate(['/dashboard', { outlets: { 'childrenComponents': 'report/companyReport' } }]);
  // }
  //---------------------------------------------------------------------------
  
  //invoked when the user clicks logout button
  onLogout() {
    //clear the username stored in the session storage
    sessionStorage.clear();
    //dispatch a logout action to rest the state
    this.store.dispatch(new AppActionLogout());
    this.router.navigateByUrl('/login');
  }
}
