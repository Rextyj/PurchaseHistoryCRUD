import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
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
    formData['lossOrGain'] = formData['soldPrice'] - formData['purchasePrice'];
    formData['avgPurchasePrice'] = formData.purchasePrice / formData.numOfSharesBought;
    formData['avgSoldPrice'] = formData.soldPrice / formData.numOfSharesSold;

    console.log('the modified data is ', formData);

    // dispatch an action to save the form object to database
    this.store.dispatch(new AppActionAdd(formData));
    // reset the form after the data is saved
    this.resetForm();
  }

  // invoked when download button is pressed
  onDownload() {
    this.res = this.newService.convertToCSV(this.dataFromStore);
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

  //reset the form to initial state
  resetForm() {
    console.log('reset called');
    this.form.reset();
  }

}
