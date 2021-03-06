import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Observable, Observer} from 'rxjs/Rx';
const jwt_decode = require('jwt-decode');
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  private loggedIn = false;

  status: Observable<boolean>;
  private observer: Observer<boolean>;


  constructor(private http: Http) {
    this.loggedIn = !!localStorage.getItem('auth_token');
    this.status = new Observable(observer => {
      this.observer = observer
      this.observer.next(!!this.getToken);
    }).share();

  }

  changeState(newState: boolean){
    if(this.observer !== undefined) {
      this.observer.next(newState);
    }
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
        environment.API_URL + '/auth/',
        body,
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        if (res.success) {
          localStorage.setItem('auth_token', res.token);
          this.loggedIn = true;
          this.changeState(true);
        }

        return res.success;
      })
      .catch((error:any) => {
      	if(error.status == 400)
      	{
      		this.loggedIn = false;
      		this.changeState(false);
      		return Observable.throw(new Error(error.status));
      	}
      });
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
    this.changeState(false);
  }

  isAdminOf(groupUuid:string): boolean{
    let org = this.getDecodedToken().memberships;
    for (let i=0;i<org.length;i++){
      if (org[i].uuid == groupUuid && org[i].is_admin == 'true') {
        return true}
    }
    return false;
  }

  isMemberOf(groupUuid:string){
    let org = this.getDecodedToken().memberships;
    for (let i=0;i<org.length;i++){
      if (org[i].uuid == groupUuid) {return true}
    }
    return false;
  }



}
