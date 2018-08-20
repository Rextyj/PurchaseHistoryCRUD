import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonService } from '../common.service';
import { Store } from '@ngrx/store';
import { AppState } from '../store/state';
import { AppActionUpd } from '../store/action';
import { listEffect } from '../store/effect';

@Component({
  // selector: 'app-root',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ],
  providers: []
})
export class DashboardComponent implements OnInit {
  // name = 'Angular';

  form: FormGroup;
  savedData: Array<Object> = [];
  output = [];
  res = '';
  fileUrl;
  dataFromStore;

  constructor(private fb: FormBuilder, private domSan: DomSanitizer, 
    private newService: CommonService, private store: Store<AppState>){
    this.form = this.fb.group({
      CompanyName: ['', [Validators.required]],
      NumberOfSharesBought: ['', [Validators.required]],
      DatePurchased: ['', [Validators.required]],
      DateSold: ['', [Validators.required]],
      NumberOfSharesSold: ['', [Validators.required]],
      PurchasePrice:['', [Validators.required]],
      SoldPrice: ['', [Validators.required]]      
    });
  }

  //reading all the records from the database
  ngOnInit() {
    // this.newService.GetPurchase().subscribe(items => {
    //   this.dataFromStore = items; 
    //   console.log(items);
    //   //construct the csv string
    //   this.toCSV();
    // });


    // this.newService.GetPurchase().subscribe(items => {
    //   this.dataFromStore = items;
    //   this.store.dispatch(new AppActionUpd(items));
    // })

    console.log('action dispatched');
    this.store.dispatch(new AppActionUpd());
    this.store.select("AppReducer").subscribe(items => {
      console.log('subscribed data is ' , items);
      this.dataFromStore = items.dataList;
    });
  }


  onAdd(formData) {
    //mode is for server.js file to recognize the intent
    formData.mode = 'Save';

    console.log('formdata is ',formData);
    formData['LossGainPrice'] = (formData['SoldPrice'] - formData['PurchasePrice']) * formData['NumberOfSharesSold'];

    console.log('the modified data is ', formData);
    //save the form object to database
    this.newService.savePurchase(formData).subscribe(data => {
      alert(data.data);
      //update has to be inside the callback
      this.ngOnInit();
      //reset the form after the data has been saved
      this.resetForm();
    }, error => console.error(error));

    
    // var blob = new Blob([this.res], { type: 'application/history' });
    // this.fileUrl = this.domSan.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }

  toCSV(){
    // this.savedData.push(formData);
    this.savedData = this.dataFromStore;
    
    console.log('the history list is ', this.savedData);
    if(this.output.length == 0){
      this.output.push(Object.keys(this.savedData[0]));
    }
    this.res = '';
    //for property names
    for(var i = 0; i < this.output.length; i++){
      this.res += this.output[i];
      if(i == this.output.length - 1){
        this.res += "\n";
      }
    }
    //for data
    for (let item of this.savedData){
      var temp;
      //note that object.values is not supported everywehre
      temp = Object.keys(item).map(key => {
        return item[key];
      });
      for(var i = 0; i < temp.length; i++){
        
        if(i == temp.length - 1){
          this.res += temp[i] + "\n";
        }else{
          this.res += temp[i] + ',';
        }
      }
    }

    console.log(this.res);
    console.log(this.output);
  }

  onDownload(){
    // console.log(this.res);
    this.toCSV();
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
}
