import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators'
import { ProductInterface } from './productInterface.service';
import { Observable } from 'rxjs';
import { path } from '../path';


/**
 * Implementations of product interface
 */
@Injectable()
export class ProductInterfaceImpl implements ProductInterface {
  url = path.recordUrl;
  constructor(private http: Http) { }

  /** 
    Used for user verification.
    Response will indicate if the user is verified
    @param user user information
    @returns {Observable} verification confirmation. 
  */
  getUser(user) {
    console.log('getuser');
    //use post to handle login
    return this.http.post(this.url + 'getUser/', user)
      //pipe map will return the response as a JSON object
      .pipe(map((response: Response) => response.json()));
  }

  /**
    Used for user creation
    Save a username and password combination to the database.
    @param user user information
    @returns if the username has already existed in the database,
              it will return an JSON object with error message and duplicated property set to true.
              Otherwise,it will return an JSON object with "successful" message
  */
  saveUser(user) {
    return this.http.post(this.url + 'saveUser/', user)
      .pipe(map((response: Response) => response.json()));
  }

  /**
    Get all the purchase records for the "owner" passed in.
    @param owner owner's username
    @returns observable that has an array of record JSON objects
  */
  GetPurchase(owner) {
    var url = "";
    url += this.url;
    url += "getPurchase";
    console.log("the get purchase url is ", url);
    return this.http.post(url, owner)
      .pipe(map((response: Response) => response.json()))
  }

  /**
   * Save a new record to the database
   * @param formdata an JSON object contains all the form information gethered from the user
   * @returns if the record have been saved
   */
  savePurchase(formdata) {
    console.log('saving');
    var url = "";
    url += this.url;
    // url += formdata.Owner;
    // url += "/SavePurchase";

    url += "SavePurchase";
    return this.http.post(url, formdata)
      .pipe(map((response: Response) => response.json()))
  }

  /**
   * Delete a record based on record id and owner
   * @param idAndOwner an JSON object conprised of the id of record needed to be deleted,
   * and the owner's username
   * @returns whether the record has been correctly deleted
   */
  deletePurchase(idAndOwner) {
    //idAndOwner is a JSON object
    var url = "";
    url += this.url;
    url += "deletePurchase";
    console.log("the get purchase url is ", url);
    //Note: delete method does not directly take a JSON object as the body, have to use requestoptions
    return this.http.delete(url, new RequestOptions({ body: idAndOwner }))
      .pipe(map((response: Response) => response.json()))
  }

  /**
   * Get summary information of the records belong to the owner
   * @param owner owner's username
   * @returns observable that has an array of summary JSON objects
   */
  getSummary(owner) {
    var url = "";
    url += this.url;
    url += "getPurchase/getAverage"
    console.log("the get Summary url is ", url);
    return this.http.post(url, owner).
      pipe(map((response: Response) => response.json()));
  }

  /**
   * Filtering data according to date range specified
   * @param owner owner's username
   * @param date an JSON object that has beginning date and ending date
   * 
   */
  getBetweenDate(owner, date) {
    var url = "";
    url += this.url;
    url += "getPurchase/getBetweenDate";
    console.log("the get BetweenDate url is ", url);
    return this.http.post(url, { date: date, owner: owner })
    .pipe(map((response: Response) => response.json()));
  }

  getMonthlyData(owner, year) {
    var url = "";
    url += this.url;
    url += owner;
    url += "/getPurchase/getMonthlyData";
    url += "/";
    url += year;
    console.log("the get monthlydata url is ", url);
    return this.http.get(url).
      pipe(map((response: Response) => response.json()));
  }

  getCompanyData(owner) {
    var url = "";
    url += this.url;
    url += owner;
    url += "/getPurchase/getCompanyData";
    console.log("the get companydata url is ", url);
    return this.http.get(url).
      pipe(map((response: Response) => response.json()));
  }

  getShareData(owner) {
    var url = "";
    url += this.url;
    url += owner;
    url += "/getPurchase/getShareData";
    console.log("the get companydata url is ", url);
    return this.http.get(url).
      pipe(map((response: Response) => response.json()));
  }

  getData(owner, year) {
    var url = "";
    url += this.url;
    url += owner;
    url += "/getPurchase/getData";
    url += "/";
    url += year;
    console.log("the get companydata url is ", url);
    return this.http.get(url).
      pipe(map((response: Response) => response.json()));
  }

  /**
   * Convert JSON objects to CSV format
   * @param data an array of JSON objects
   * @returns a string in the form of CSV
   */
  convertToCSV(data) {
    // this.savedData.push(formData);
    console.log(typeof data);
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



