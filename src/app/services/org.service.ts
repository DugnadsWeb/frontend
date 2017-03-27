import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable} from 'rxjs/Rx';
import { AuthService} from './auth.service';
import { Organization, User } from '../models/models';

@Injectable()
export class OrgService {

  constructor(private http: Http,
              private authService: AuthService) { }

	/*
	* Register a new organization.
	*/

	registerorg(org_number, org_name, email, phone, description)
	{
		let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if(!description)
    {
    	description = "Ingen beskrivelse av organisasjonen";
    }
    let body = JSON.stringify({ org_number, org_name, email, phone, description });
    console.log(body);
    return this.http
      .post(
        'http://localhost:8888/api/org/',
        body,
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        if (res) {
          console.log("organization created succesfully");
        }
        return res;
      });

	}

	getOrgs()
	{
		return this.http
			.get(
				'http://localhost:8888/api/org/all'
			)
			.map(res => res.json())
			.map((res) => {
				if(res)
				{
					console.log("organizations fetched");
				}

				return res;
			})
			.catch((error:any) => {
      		return Observable.throw(new Error(error.status));
      });
	}

  getOrg(uuid: string){
    let headers = new Headers();
    headers.append('authorization', 'Bearer ' + this.authService.getToken());
    return this.http.get('http://localhost:8888/api/org/'+uuid, {headers: headers})
    .map(res => res.json())
    .map(res => {
      return new Organization(res.uuid, res.org_name, res.org_number, res.email, res.phone, res.description);
    })
    .catch((err:any) => {
      console.log(err);
      return Observable.throw(new Error(err.status));
    })
  }

  // TODO refator getMember and getAdmin and possibly cache
  getMembers(uuid: string){
    let headers = new Headers();
    headers.append('authorization', 'Bearer ' + this.authService.getToken());
    return this.http.get('http://localhost:8888/api/org/members/'+uuid, {headers: headers})
    .map(res => res.json())
    .map(res => {
      let ret = [];
      for(let i=0;i<res.members.length;i++) {
        let u = res.members[i];
        ret.push(new User(u.email, u.first_name, u.last_name, u.phone));
      }
      return ret;
    })
    .catch((err:any) => {
      console.log(err);
      return Observable.throw(new Error(err.status));
    })
  }

  getAdmins(uuid: string){
    let headers = new Headers();
    headers.append('authorization', 'Bearer ' + this.authService.getToken());
    return this.http.get('http://localhost:8888/api/org/members/'+uuid, {headers: headers})
    .map(res => res.json())
    .map(res => {
      let ret = [];
      for(let i=0;i<res.admins.length;i++) {
        let u = res.admins[i];
        ret.push(new User(u.email, u.first_name, u.last_name, u.phone));
      }
      return ret;
    })
    .catch((err:any) => {
      console.log(err);
      return Observable.throw(new Error(err.status));
    })
  }

  applyTo(userEmail:string, orgUuid: string){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('authorization', 'Bearer ' + this.authService.getToken());
    let body = JSON.stringify({
      user: { email: userEmail },
      org: { uuid: orgUuid }
      });
    return this.http
      .post(
        'http://localhost:8888/api/org/apply',
        body,
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        if (res) {
          console.log("application sent");
        }
        return res;
      });
    }

    removeMember(memberEmail, orgUuid){
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('authorization', 'Bearer ' + this.authService.getToken());
      let body = JSON.stringify({
        user: { email: memberEmail },
        org: { uuid: orgUuid }
        });
      return this.http
        .post(
          'http://localhost:8888/api/org/rmmember',
          body,
          { headers }
        )
        .map(res => res.json())
        .map((res) => {
          if (res) {
            console.log(res);
          }
          return res;
        });
      }
    

}
