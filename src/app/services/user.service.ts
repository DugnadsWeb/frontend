import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { AuthService } from './auth.service';
import { User } from '../models/models';


@Injectable()
export class UserService {

  private user: BehaviorSubject<User>;

  constructor(private http: Http,
		private authService:AuthService) {
      this.getUserDataOnLogin();
    }
  // ###########
  // Getters ###
  // ###########

  public getUser():User{
    if (!this.user) { throw "No user present"}
    return this.user.getValue();
  }

  public getUserObservable():Observable<User>{
    if (!this.user) { throw "No user present"}
    return this.user.asObservable();
  }

  // ###################
  // Private methods ###
  // ###################

  /*
  * Subscribes to loginstatus in AuthService.
  * Gets user data of loged in user on login.
  * Removes user data on logout
  */
  private getUserDataOnLogin(){
    this.authService.status.subscribe(status => {
      if (status){
        this.user = new BehaviorSubject(null);
        let subscription = this.getUserHttp(this.authService.getDecodedToken().email)
        .subscribe(res => {
          this.user.next(res);
          subscription.unsubscribe;
        })
      } else {
        this.user = null;
      }
    })
  }

  // #############
  // HTTP calls ##
  // #############

	register(firstName, lastName, email, password)
	{
		let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let body = JSON.stringify({ firstName, lastName, email, password });
    console.log(body);
    return this.http
      .post(
        'http://localhost:8888/api/user/',
        body,
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
          console.log("user created succesfully");

        return res;
      });
	}

  getUserHttp(userId){
    let headers = new Headers();
		headers.append('authorization', 'Bearer ' + this.authService.getToken());
		return this.http
			.get(
				'http://localhost:8888/api/user/'+userId,
				{headers}
			)
			.map(res => res.json())
			.map((res) => {
				return new User(res.email, res.firstName, res.lastName, res.phone);
			})
			.catch((error:any) => {
      	if(error.status == 400)
      	{
      		return Observable.throw(new Error(error.status));
      	}
      });
  }

	hasAppliedTo(orgId, userId){
		let headers = new Headers();
    headers.append('Content-Type', 'application/json');
		headers.append('authorization', 'Bearer ' + this.authService.getToken());
    return this.http
      .get(
        'http://localhost:8888/api/user/applications/'+userId,
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        for (let i=0;i<res.length;i++){
          console.log(res[i]);
          console.log(orgId);
					if (res[i] == orgId){
						return true;
					}
					return false;
				}
      });
	}

	postPicture(pictureString, email)
	{
		let headers = new Headers();
    headers.append('Content-Type', 'application/json');
		headers.append('authorization', 'Bearer ' + this.authService.getToken());
    let body = JSON.stringify({ base64: pictureString, user: {email: email} });
    console.log(body);
    return this.http
      .post(
        'http://localhost:8888/api/user/picture',
        body,
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        if (res.success) {
          console.log("picture saved");
        }

        return res.success;
      })
      .catch((error:any) => {
      	if(error.status == 400)
      	{
      		console.log("SOMETHING WENT WRONG");
      		return Observable.throw(new Error(error.status));
      	}
      });

	}

	getPicture(email)
	{
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('authorization', 'Bearer ' + this.authService.getToken());
		let body = JSON.stringify({user: {email: email}});
		return this.http
			.get(
				'http://localhost:8888/api/user/picture/'+email,
				{headers}
			)
			.map(res => res.json())
			.map((res) => {
				if(res)
				{
          console.log(res);
				}
				return res;
			})
			.catch((error:any) => {
      	if(error.status == 400)
      	{
      		return Observable.throw(new Error(error.status));
      	}
      });
	}

	getOrganizations(email){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('authorization', 'Bearer ' + this.authService.getToken());
    let body = JSON.stringify({user: {email: email}});
    return this.http
      .get(
        'http://localhost:8888/api/user/organizations/'+email,
        {headers}
      )
      .map(res => res.json())
      .map((res) => {
        if(res)
        {
          console.log(res);
        }
        return res;
      })
      .catch((error:any) => {
        if(error.status == 400)
        {
          return Observable.throw(new Error(error.status));
        }
      });
  }

}
