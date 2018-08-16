import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  providers: [CommonService]
})
export class AppComponent  {
  name = 'Angular';

  form: FormGroup;
  savedData: Array<Object> = [];
  output = [];
  res = '';
  fileUrl;

  constructor(private fb: FormBuilder, private domSan: DomSanitizer, private newService: CommonService){
    this.form = this.fb.group({
      itemName: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      price: ['', [Validators.required]],
      purchaseDate: ['', [Validators.required]],
      companyName: ['']      
    });
  }

  onAdd(formData) {
    this.savedData.push(formData);
    formData.mode = 'Save';
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

    this.newService.savePurchase(formData).subscribe(data => {
      alert(data.data);
      
    }, error => console.error(error));
    // var blob = new Blob([this.res], { type: 'application/history' });
    // this.fileUrl = this.domSan.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }

  onDownload(){
    console.log(this.res);
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


}
