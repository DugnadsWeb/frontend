import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable} from 'rxjs/Rx';
import { AuthService} from './auth.service';
import { Organization, User, Application, Dugnad } from '../models/models';

@Injectable()
export class OrgService {

  constructor(private http: Http,
              private authService: AuthService) { }

	/*
	* Register a new organization.
	*/

	registerorg(orgNumber, orgName, email, phone, description)
	{
		let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('authorization', 'Bearer ' + this.authService.getToken());
    if(!description)
    {
    	description = "Ingen beskrivelse av organisasjonen";
    }
    let body = JSON.stringify({ orgNumber, orgName, email, phone, description });
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
      return new Organization(res.uuid, res.orgName, res.orgNumber, res.email, res.phone, res.description);
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
        ret.push(new User(u.email, u.firstName, u.lastName, u.phone));
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
        ret.push(new User(u.email, u.firstName, u.lastName, u.phone));
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

      getApplicants(orgUuid){
        let headers = new Headers();
        headers.append('authorization', 'Bearer ' + this.authService.getToken());
        return this.http.get('http://localhost:8888/api/org/applicants/'+orgUuid,
        {headers: headers})
        .map(res => res.json())
        .map(res => {
          console.log(res);
          let ret = [];
          for (let i=0;i<res.length;i++){
            let u = res[i].user;
            let user = new User(u.email, u.firstName, u.lastName, u.phone);
            ret.push(new Application(user, res[i].applied.applied_date))
          }
          return ret;
        })
        .catch((err:any) => {
          console.log(err);
          return Observable.throw(new Error(err.status));
        })

      }

      processApplication(userId, orgId, action){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('authorization', 'Bearer ' + this.authService.getToken());
        let body = JSON.stringify({
          user: { email: userId },
          org: { uuid: orgId },
          accept: action
          });
        return this.http
          .post(
            'http://localhost:8888/api/org/applicant',
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

      updateOrg(org:Organization){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('authorization', 'Bearer ' + this.authService.getToken());
        let body = JSON.stringify({org: org});
        console.log(body);
        return this.http
          .put(
            'http://localhost:8888/api/org/',
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

      editAdminRights(orgId, userId, action){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('authorization', 'Bearer ' + this.authService.getToken());
        let body = JSON.stringify({
          user: { email: userId },
          org: { uuid: orgId },
          admin: action
          });
        return this.http
          .post(
            'http://localhost:8888/api/org/chadmin',
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

      getDugnads(orgId){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('authorization', 'Bearer ' + this.authService.getToken());
        return this.http
    			.get(
    				'http://localhost:8888/api/org/dugnads/'+orgId,
            { headers }
    			)
    			.map(res => res.json())
    			.map((res) => {
    				if(res)
    				{
    					console.log("dugnads fetched for " + orgId);
    				}
            let ret = [];
            for (let i=0;i<res.length;i++){
              let d = res[i];
              ret.push(new  Dugnad(d.uuid, d.orgUuid, d.title, d.description,
                d.location, d.startTime, d.endTime, d.maxPartisipants));
            }
            return ret;
    			})
    			.catch((error:any) => {
          		return Observable.throw(new Error(error.status));
          });
      }

}
