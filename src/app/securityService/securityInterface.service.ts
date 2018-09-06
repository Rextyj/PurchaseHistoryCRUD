import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * @description Service interface
 */

@Injectable()
export abstract class SecurityInterface {
  abstract getUser(T): Observable<any>;

  abstract saveUser(T): Observable<any>;

}