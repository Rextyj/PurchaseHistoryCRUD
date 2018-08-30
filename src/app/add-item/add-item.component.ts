import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonService } from '../common.service';
import { Store } from '@ngrx/store';
import { AppState } from '../store/state';
import { AppActionUpd, AppActionAdd } from '../store/action';
import { listEffect } from '../store/effect';
import { Router } from '@angular/router';

@Component({
  // selector: 'app-root',
  templateUrl: './add-item.component.html',
  styleUrls: [ './add-item.component.css' ],
  providers: []
})
export class AddItemComponent implements OnInit {
  // name = 'Angular';

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
    private newService: CommonService, private store: Store<AppState>,
    private router: Router){
    this.form = this.fb.group({
      companyName: ['', [Validators.required]],
      numOfSharesBought: ['', [Validators.required]],
      datePurchased: ['', [Validators.required]],
      dateSold: ['', [Validators.required]],
      numOfSharesSold: ['', [Validators.required]],
      purchasePrice:['', [Validators.required]],
      soldPrice: ['', [Validators.required]]      
    });
  }

  //reading all the records from the database
  ngOnInit() {
    console.log('action dispatched');
    
    //this.store.subscribe will return 
    /*
      {
        AppReducer: {
          dataList: ...,
          owner: ...
        }
      }

      we just want what's inside the appreducer 
    */
    this.store.select("AppReducer").subscribe(state => {
      console.log('subscribed data is ' , state);
      this.owner = state.owner;
      this.dataFromStore = state.dataList;
    });
  }


  onAdd(formData) {
    //mode is for server.js file to recognize the intent
    formData.mode = 'Save';

    formData.Owner = this.owner;

    console.log('formdata is ',formData);
    //Note the sold price and purchase price are total price not per share price
    formData['lossOrGain'] = formData['soldPrice'] - formData['purchasePrice'];
    formData['avgPurchasePrice'] = formData.purchasePrice / formData.numOfSharesBought;
    formData['avgSoldPrice'] = formData.soldPrice / formData.numOfSharesSold;

    console.log('the modified data is ', formData);
    //save the form object to database
    this.store.dispatch(new AppActionAdd(formData));
    this.resetForm();
    // this.newService.savePurchase(formData).subscribe(data => {
    //   alert(data.data);

    //   this.store.dispatch(new AppActionUpd({owner: this.owner}));
    //   //update has to be inside the callback
    //   this.ngOnInit();
      
    //   //reset the form after the data has been saved
    //   this.resetForm();
    // }, error => console.error(error));
  }

  onDownload(){
    // console.log(this.res);
    this.res = this.newService.convertToCSV(this.dataFromStore);
    var blob = new Blob([this.res], { type: 'application/history' });
    this.fileUrl = window.URL.createObjectURL(blob);
    var aTag = document.createElement('a');
    console.log(this.fileUrl);
    aTag.href = this.fileUrl;
    aTag.download = 'history.csv';
    aTag.hidden = true;
    aTag.click();
    // document.body.appendChild(aTag);
  }

  resetForm(){
    console.log('reset called');
    // myForm.resetForm;
    this.form.reset();
  }

  onView(){
    this.router.navigateByUrl('/display');
  }
}
