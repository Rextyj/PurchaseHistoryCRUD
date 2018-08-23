import { Injectable } from '@angular/core';   
import {Http,Response, Headers, RequestOptions } from '@angular/http';   
   
import { Observable } from 'rxjs';  
import {map} from 'rxjs/operators'
 
  
@Injectable()  
export class CommonService {  
  
  constructor(private http: Http) { }  
  
  savePurchase(item){   
    console.log('saving');   
    return this.http.post('http://localhost:8080/records/api/SavePurchase/', item)  
            .pipe(map((response: Response) =>response.json()))              
  }  
  
  GetPurchase(owner){
    //note: we have to pass in a JSON object!!!!       
    return this.http.post('http://localhost:8080/records/api/getPurchase/', owner)  
            .pipe(map((response: Response) => response.json()))              
  }  
 deletePurchase(id){   
    return this.http.post('http://localhost:8080/records/api/deletePurchase/',{'id': id})  
            .pipe(map((response: Response) =>response.json()))               
  }  
  
  saveUser(user){
    return this.http.post('http://localhost:8080/users/api/SaveUser/', user)
            .pipe(map((response: Response) =>response.json()));
  }

  getUser(user){
    console.log('getuser');
    //use post to handle login
    return this.http.post('http://localhost:8080/users/api/getUser/', user)
    //pipe map will return the response as a JSON object
                    .pipe(map((response: Response) =>response.json()));
  }


  getSummary(){
    return this.http.get('http://localhost:8080/records/api/getSummary').
      pipe(map((response: Response) =>response.json()));
  }


  getBetweenDate(user){
    return this.http.post('http://localhost:8080/records/api/getBetweenDate',user).
    pipe(map((response: Response) =>response.json()));
  }

  
  getSearchResult(param){
    return this.http.post('http://localhost:8080/records/api/getSearchResult/', param)
                    .pipe(map((response: Response) => response.json()));
  }


}  
