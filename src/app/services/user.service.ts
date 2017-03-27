import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable} from 'rxjs/Rx';
import { AuthService} from './auth.service';


@Injectable()
export class UserService {

  constructor(private http: Http,
		private authService:AuthService) { }


	register(first_name, last_name, email, password)
	{
		let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let body = JSON.stringify({ first_name, last_name, email, password });
    console.log(body);
    return this.http
      .post(
        'http://localhost:8888/api/user/',
        body,
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        if (res.success) {
          console.log("user created succesfully");
        }

        return res.success;
      });

	}

	hasAppliedTo(uuid){
		let headers = new Headers();
    headers.append('Content-Type', 'application/json');
		headers.append('authorization', 'Bearer ' + this.authService.getToken());
    return this.http
      .get(
        'http://localhost:8888/api/user/',
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        for (let i=0;i<res.length;i++){
					if (res[i] == uuid){
						return true;
					}
					return false;
				}
      });
	}


	//Calls database with autchentication token, returns payload of token.
	//DEPRECATED
	/*getData(token)
	{

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let body = JSON.stringify({ token : token });
    return this.http
      .post(
        'http://localhost:8888/api/user/me',
        body,
        { headers }
      )
      .map(res => res.json())
      .map((res) => {

        return res;
      })
      .catch((error:any) => {
      		return Observable.throw(new Error(error.status));
      });
	}*/

}
