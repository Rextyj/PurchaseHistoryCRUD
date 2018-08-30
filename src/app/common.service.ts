import { Injectable } from '@angular/core';   
import {Http,Response, Headers, RequestOptions } from '@angular/http';   
   
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
