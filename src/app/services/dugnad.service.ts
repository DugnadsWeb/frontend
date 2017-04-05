import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable} from 'rxjs/Rx';
import { AuthService} from './auth.service';
import { Organization, User, Application, Dugnad, Activity } from '../models/models';

@Injectable()
export class DugnadService {

  constructor(private http: Http,
    private authService: AuthService) { }


  getDugnad(id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
		headers.append('authorization', 'Bearer ' + this.authService.getToken());
    return this.http
      .get(
        'http://localhost:8888/api/dugnad/'+id,
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
          return new  Dugnad(res.uuid, res.orgUuid, res.title, res.description,
            res.location, res.startTime, res.endTime, res.maxPartisipants, res.status);

      });
  }


	/*
	* Registrer a new dugnad
	*/

	registrerdug(dugnad: Dugnad, orgId){
    delete dugnad.uuid;
		let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('authorization', 'Bearer ' + this.authService.getToken());
    let body = JSON.stringify({dugnad:dugnad, org: {uuid:orgId}});
	console.log(body);
	return this.http
	  .post(
		'http://localhost:8888/api/dugnad/',
		body,
		{ headers }
	  )
	  .map(res => res.json())
	  .map((res) => {
		if (res) {
			console.log("Dugnad created succesfully");
		}
		return res;
	  });

	}

	getDugnadsForOrg(id){
    let dugnads = [];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('authorization', 'Bearer ' + this.authService.getToken());
    return this.http
      .get(
        'http://localhost:8888/api/dugnad/organization/'+id,
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        for(let i = 0; i < res.length; i++){

          dugnads.push(new  Dugnad(res[i].uuid, id, res[i].title, res[i].description,
            res[i].location, res[i].startTime, res[i].endTime, res[i].maxPartisipants, res[i].status));

        }
        return dugnads;
      });
  }

	getDugnads()
	{
		return this.http
			.get(
				'http://localhost:8888/api/dugnad/all'
			)
			.map(res => res.json())
			.map((res) => {
				if(res)
				{
					console.log("dugnads fetched");
				}
        let ret = []
        for (let i=0;i<res.length;i++){
          let d = res[i];
          ret.push(new  Dugnad(res.uuid, res.orgUuid, res.title, res.description,
            res.location, res.startTime, res.endTime, res.maxPartisipants, res.status));
        }
			})
			.catch((error:any) => {
      		return Observable.throw(new Error(error.status));
      });
	}

  getActivities(dugnadId){
    return this.http
      .get(
        'http://localhost:8888/api/dugnad/activities/' + dugnadId
      )
      .map(res => res.json())
      .map((res) => {
        if(res)
        {
          console.log("dugnads fetched");
        }
        let ret = []
        for (let i=0;i<res.length;i++){
          let d = res[i];
          console.log(res);
          ret.push(new Activity(d.uuid, d.title, d.startTime,
            d.endTime, d.description, d.maxPartisipants));
        }
        return ret;
      })
      .catch((error:any) => {
          return Observable.throw(new Error(error.status));
      });
    }
}
