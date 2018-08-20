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
  
  GetPurchase(){       
    return this.http.get('http://localhost:8080/records/api/getPurchase/')  
            .pipe(map((response: Response) => response.json()))              
  }  
 deletePurchase(id){   
    return this.http.post('http://localhost:8080/records/api/deletePurchase/',{'id': id})  
            .pipe(map((response: Response) =>response.json()))               
  }  
  
  saveUser(user){
    return this.http.post('http://localhost:8080/users/api/SaveUser/', user);
  }

}  
