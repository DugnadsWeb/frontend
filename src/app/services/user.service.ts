import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';


@Injectable()
export class UserService {

  constructor(private http: Http) { }


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
	
	getData(token)
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
        if (res) {
          
        }

        return res;
      });
	}
	
}
