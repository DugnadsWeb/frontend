import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable} from 'rxjs/Rx';
import { AuthService} from './auth.service';
import { Organization, User, Application, Dugnad } from '../models/models';

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
        return new  Dugnad(res[0].uuid, id, res[0].title, res[0].description,
          res[0].location, res[0].startTime, res[0].endTime, res[0].maxPartisipants, res[0].status);
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
}
