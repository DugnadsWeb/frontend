import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
const jwt_decode = require('jwt-decode');


@Injectable()
export class AuthService {
  private loggedIn = false;
  private loginFailed = false;


  constructor(private http: Http) {
    this.loggedIn = !!localStorage.getItem('auth_token');
  }

  getToken():any{
    if (this.loggedIn){
      return localStorage.getItem('auth_token');
    }
    return false;
  }

  getDecodedToken(){
    if (this.loggedIn){
      return jwt_decode(localStorage.getItem('auth_token'));
    }
    return false;
  }

  login(email, password) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let body = JSON.stringify({ email, password });
    return this.http
      .post(
        'http://localhost:8888/api/auth/',
        body,
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        if (res.success) {
          localStorage.setItem('auth_token', res.token);
          this.loggedIn = true;
        }

        return res.success;
      })
      .catch((error:any) => {
      	if(error.status == 400)
      	{
      		this.loggedIn = false;
      		return Observable.throw(new Error(error.status));
      	}
      });
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  isAdminOf(groupUuid:string): boolean{
    let org = this.getDecodedToken().memberships;
    for (let i=0;i<org.length;i++){
      if (org[i].uuid == groupUuid && org[i].is_admin) {return true}
    }
    return false;
  }



}
