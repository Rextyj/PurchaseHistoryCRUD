import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators'
import { SecurityInterface } from './securityInterface.service';
import { Observable } from 'rxjs';
import {path} from '../path'

@Injectable()
export class SecurityInterfaceImpl implements SecurityInterface {
  url = path.userUrl;
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

}



