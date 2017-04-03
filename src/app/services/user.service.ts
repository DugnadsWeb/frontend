import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable} from 'rxjs/Rx';
import { AuthService} from './auth.service';


@Injectable()
export class UserService {

  constructor(private http: Http,
		private authService:AuthService) { }


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
        if (res.success) {
          console.log("user created succesfully");
        }

        return res.success;
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
					
				}
				return res;
			})
			.catch((error:any) => {
      	if(error.status == 400)
      	{
      		console.log("No picture");
      		return Observable.throw(new Error(error.status));
      	}
      });
	}

}
