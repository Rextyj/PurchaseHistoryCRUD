import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { formatDate } from '@angular/common';
import { ProductInterfaceImpl } from '../productService/productInterfaceImpl.service';
import { Store } from '@ngrx/store';
import { AppState } from '../store/state';
import { AppActionAdd, AppActionUpdateSummary } from '../store/action';
import { Router } from '@angular/router';

@Component({
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
  providers: []
})
export class AddItemComponent implements OnInit {

  form: FormGroup;
  savedData: Array<Object> = [];
  output = [];
  res = '';
  fileUrl;
  dataFromStore;
  owner;
  purchasePricePerShare;
  soldPricePerShare;

  constructor(private fb: FormBuilder, private domSan: DomSanitizer,
    private newService: ProductInterfaceImpl, private store: Store<AppState>,
    private router: Router) {
    this.form = this.fb.group({
      companyName: ['', [Validators.required]],
      numOfSharesBought: ['', [Validators.required]],
      datePurchased: ['', [Validators.required]],
      dateSold: ['', [Validators.required]],
      numOfSharesSold: ['', [Validators.required]],
      purchasePrice: ['', [Validators.required]],
      soldPrice: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    console.log('action dispatched');

    //reading all the records from the database
    //this.store.subscribe will return 
    /*
      {
        AppReducer: {
          dataList: ...,
          owner: ...
        }
      }
    */
    this.store.select("AppReducer").subscribe(state => {
      console.log('subscribed data is ', state);
      this.owner = state.owner;
      this.dataFromStore = state.dataList;
    });
  }

  // invoked when the add button is clicked
  onAdd(formData) {
    // mode is for server.js file to recognize the intent
    formData.mode = 'Save';
    // pass the owner info into the formData object
    formData.Owner = this.owner;

    console.log('formdata is ', formData);
    // Note the sold price and purchase price are total price not per share price
    formData['lossOrGain'] = (formData['soldPrice'] - formData['purchasePrice']).toFixed(2);
    formData['avgPurchasePrice'] = (formData.purchasePrice / formData.numOfSharesBought).toFixed(2);
    formData['avgSoldPrice'] = (formData.soldPrice / formData.numOfSharesSold).toFixed(2);

    // formData.datePurchased = formatDate(formData.datePurchased, "short", "en-US").split(",")[0];
    // formData.dateSold = formatDate(formData.dateSold, "short", "en-US").split(",")[0];

    console.log('the modified data is ', formData);

    // dispatch an action to save the form object to database
    this.store.dispatch(new AppActionAdd(formData));
    // reset the form after the data is saved
    this.resetForm();
  }

  //reset the form to initial state
  resetForm() {
    this.form.reset();
  }

}
