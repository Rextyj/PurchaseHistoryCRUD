import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * @description Service interface
 */

@Injectable()
export abstract class ProductInterface {
  abstract getUser(T): Observable<any>;

  abstract saveUser(T): Observable<any>;

  abstract GetPurchase(T): Observable<any>;

  abstract savePurchase(T): Observable<any>;

  abstract deletePurchase(T): Observable<any>;

  abstract getSummary(T): Observable<any>;

  abstract getBetweenDate(T1, T2): Observable<any>;

  abstract getMonthlyData(T1, T2): Observable<any>; 

  abstract getCompanyData(T1): Observable<any>;

  abstract convertToCSV(T): String;
}