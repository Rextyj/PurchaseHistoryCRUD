import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators'
const CACHE_KEY = 'httpAppCache';

@Injectable()
export class CommonService {
  path;
  cacheURL;
  constructor(private http: Http, private httpz: HttpClient) {

  }


  savePurchase(item) {
    console.log('saving');

    return this.http.post('http://localhost:8080/records/api/SavePurchase/', item)
      .pipe(map((response: Response) => response.json()))

  }

  GetPurchase(owner) {
    //note: we have to pass in a JSON object!!!!       
    return this.http.post('http://localhost:8080/records/api/getPurchase/', owner)
      .pipe(map((response: Response) => response.json()))
  }

  getPurchase2(owner) {
    return this.http.post('http://localhost:8080/records/api/getPurchase/', owner)
      .pipe(map((response: Response) => response.json()))
      .subscribe(data => {
        console.log("get returns ", data);
        localStorage[CACHE_KEY] = JSON.stringify(data);
      })
  }

  deletePurchase(idAndOwner) {
    //idAndOwner is a JSON object
    return this.http.post('http://localhost:8080/records/api/deletePurchase/', idAndOwner)
      .pipe(map((response: Response) => response.json()))
  }

  saveUser(user) {
    return this.http.post('http://localhost:8080/users/api/SaveUser/', user)
      .pipe(map((response: Response) => response.json()));
  }

  getUser(user) {
    console.log('getuser');
    //use post to handle login
    return this.http.post('http://localhost:8080/users/api/getUser/', user)
      //pipe map will return the response as a JSON object
      .pipe(map((response: Response) => response.json()));
  }


  getSummary(owner) {


    return this.http.post('http://localhost:8080/records/api/getSummary', owner).
      pipe(map((response: Response) => response.json()));
  }


  getBetweenDate(date) {
    return this.http.post('http://localhost:8080/records/api/getBetweenDate', date).
      pipe(map((response: Response) => response.json()));
  }


  getSearchResult(param) {
    return this.http.post('http://localhost:8080/records/api/getSearchResult/', param)
      .pipe(map((response: Response) => response.json()));
  }
  convertToCSV(data) {
    // this.savedData.push(formData);
    var savedData = data;
    var output = [];
    console.log('the history list is ', savedData);
    if (output.length == 0) {
      output.push(Object.keys(savedData[0]));
    }
    var res = '';
    //for property names
    for (var i = 0; i < output.length; i++) {
      res += output[i];
      if (i == output.length - 1) {
        res += "\n";
      }
    }
    //for data
    for (let item of savedData) {
      var temp;
      //note that object.values is not supported everywehre
      temp = Object.keys(item).map(key => {
        return item[key];
      });
      for (var i = 0; i < temp.length; i++) {

        if (i == temp.length - 1) {
          res += temp[i] + "\n";
        } else {
          res += temp[i] + ',';
        }
      }
    }

    console.log(res);
    console.log(output);
    return res;
  }

}
