import { Injectable } from '@angular/core';   
import {Http,Response, Headers, RequestOptions } from '@angular/http';   
   
import { Observable } from 'rxjs';  
import {map} from 'rxjs/operators'
 
  
@Injectable()  
export class CommonService {  
  
  constructor(private http: Http) { }  
  
  savePurchase(user){      
    return this.http.post('http://localhost:8080/api/SavePurchase/', user)  
            .pipe(map((response: Response) =>response.json()))              
  }  
  
  GetPurchase(){       
    return this.http.get('http://localhost:8080/api/getPurchase/')  
            .pipe(map((response: Response) => response.json()))              
  }  
 deletePurchase(id){   
    return this.http.post('http://localhost:8080/api/deletePurchase/',{'id': id})  
            .pipe(map((response: Response) =>response.json()))               
  }  
  
}  
