import { Injectable } from '@angular/core';   
import {Http,Response, Headers, RequestOptions } from '@angular/http';   
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';  
import {map} from 'rxjs/operators'
 
  
@Injectable()  
export class CommonService {  
  
  constructor(private http: Http) { }  
  
  savePurchase(formdata){   
    console.log('saving'); 
    var url = "http://localhost:8080/records/api/";
    url += formdata.Owner;
    url += "/SavePurchase";
    return this.http.post(url, formdata)  
            .pipe(map((response: Response) =>response.json()))              
  }  
  
  GetPurchase(owner){
    var url = "http://localhost:8080/records/api/";
    url += owner.owner;
    url += "/getPurchase";
    console.log("the get purchase url is ", url);
    return this.http.get(url)  
            .pipe(map((response: Response) => response.json()))              
  }  

 deletePurchase(idAndOwner){   
   //idAndOwner is a JSON object
   var url = "http://localhost:8080/records/api/";
    url += idAndOwner.owner;
    url += "/deletePurchase/";
    url += idAndOwner.id
    console.log("the get purchase url is ", url);
    return this.http.delete(url)  
            .pipe(map((response: Response) =>response.json()))               
  }  
  

  /*onAverage(){
    var url = "http://localhost:8080/records/api/getPurchase/getAverage";
    return this.http.get(url).pipe(map((response:Response)=> response.json()))
  }*/

  // saveUser(user){
  //   return this.http.post('http://localhost:8080/users/api/SaveUser/', user)
  //           .pipe(map((response: Response) =>response.json()));
  // }

  saveUser(user){
    return this.http.post('http://localhost:8080/users/api/saveUser/', user)
            .pipe(map((response: Response) =>response.json()));
  }

  getUser(user){
    console.log('getuser');
    //use post to handle login
    return this.http.post('http://localhost:8080/users/api/getUser/', user)
    //pipe map will return the response as a JSON object
                    .pipe(map((response: Response) =>response.json()));
  }


  getSummary(owner){
    var url = "http://localhost:8080/records/api/";
    url += owner.owner;
    url += "/getPurchase/getAverage"
    console.log("the get Summary url is ", url);
    return this.http.get(url).
      pipe(map((response: Response) =>response.json()));
  }


  getBetweenDate(owner,date){
    var url = "http://localhost:8080/records/api/";
    url += owner;
    url += "/getPurchase/getBetweenDate";
    url += "/";
    url += date.beginningDate;
    url += "/";
    url += date.endDate;
    console.log("the get BetweenDate url is ", url);
    return this.http.get(url).
    pipe(map((response: Response) =>response.json()));
  }

  
  getSearchResult(param){
    return this.http.post('http://localhost:8080/records/api/getSearchResult/', param)
                    .pipe(map((response: Response) => response.json()));
  }

  convertToCSV(data){
    // this.savedData.push(formData);
    console.log(typeof data);
    var savedData = data;
    var output = [];
    console.log('the history list is ', savedData);
    if(output.length == 0){
      output.push(Object.keys(savedData[0]));
    }
    var res = '';
    //for property names
    for(var i = 0; i < output.length; i++){
      res += output[i];
      if(i == output.length - 1){
        res += "\n";
      }
    }
    //for data
    for (let item of savedData){
      var temp;
      //note that object.values is not supported everywehre
      temp = Object.keys(item).map(key => {
        return item[key];
      });
      for(var i = 0; i < temp.length; i++){
        
        if(i == temp.length - 1){
          res += temp[i] + "\n";
        }else{
          res += temp[i] + ',';
        }
      }
    }

    console.log(res);
    console.log(output);
    return res;
  }

}

interface CacheContent {
  expiry: number;
  value: any;
}
  console.log('f');
/**
 * Cache Service is an observables based in-memory cache implementation
 * Keeps track of in-flight observables and sets a default expiry for cached values
 * @export
 * @class CacheService
 */
export class CacheService {
  
  private cache: Map<string, CacheContent> = new Map<string, CacheContent>();
  private inFlightObservables: Map<string, Subject<any>> = new Map<string, Subject<any>>();
  readonly DEFAULT_MAX_AGE: number = 300000;

  /**
   * Gets the value from cache if the key is provided.
   * If no value exists in cache, then check if the same call exists
   * in flight, if so return the subject. If not create a new
   * Subject inFlightObservable and return the source observable.
   */
  get(key: string, fallback?: Observable<any>, maxAge?: number): Observable<any> | Subject<any> {

    if (this.hasValidCachedValue(key)) {
      console.log(`%cGetting from cache ${key}`, 'color: green');
      return this.cache.get(key).value;
    }

    if (!maxAge) {
      maxAge = this.DEFAULT_MAX_AGE;
    }

    if (this.inFlightObservables.has(key)) {
      return this.inFlightObservables.get(key);
    } else if (fallback && fallback instanceof Observable) {
      this.inFlightObservables.set(key, new Subject());
      console.log(`%c Calling api for ${key}`, 'color: purple');
    } else {
      return Observable.throw('Requested key is not available in Cache');
    }

  }

  /**
   * Sets the value with key in the cache
   * Notifies all observers of the new value
   */
  set(key: string, value: any, maxAge: number = this.DEFAULT_MAX_AGE): void {
    this.cache.set(key, { value: value, expiry: Date.now() + maxAge });
    this.notifyInFlightObservers(key, value);
  }

  /**
   * Checks if the a key exists in cache
   */
  has(key: string): boolean {
    return this.cache.has(key);
  }

  /**
   * Publishes the value to all observers of the given
   * in progress observables if observers exist.
   */
  private notifyInFlightObservers(key: string, value: any): void {
    if (this.inFlightObservables.has(key)) {
      const inFlight = this.inFlightObservables.get(key);
      const observersCount = inFlight.observers.length;
      if (observersCount) {
        console.log(`%cNotifying ${inFlight.observers.length} flight subscribers for ${key}`, 'color: blue');
        inFlight.next(value);
      }
      inFlight.complete();
      this.inFlightObservables.delete(key);
    }
  }

  /**
   * Checks if the key exists and   has not expired.
   */
  private hasValidCachedValue(key: string): boolean {
    if (this.cache.has(key)) {
      if (this.cache.get(key).expiry < Date.now()) {
        this.cache.delete(key);
        return false;
      }
      return true;
    } else {
      return false;
    }
  }
}
  
