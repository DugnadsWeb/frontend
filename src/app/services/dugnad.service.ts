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
        let ret = []
        for (let i=0;i<res.length;i++){
          let d = res[i];
          ret.push(new  Dugnad(d.uuid, d.title, d.description,
            d.location, d.startTime, d.endTime, d.maxPartisipants));
        }
        return ret;
      });
  }


	/*
	* Registrer a new dugnad
	*/
	
	registrerdug(dugNavn, dugBeskrivelse, dugSted, dugStartDato, dugStartTid, dugSluttDato, dugSluttTid, dugAnt)
	{
		let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('authorization', 'Bearer ' + this.authService.getToken());
    let body = JSON.stringify({ dugNavn, dugBeskrivelse, dugSted, dugStartDato, dugStartTid, dugSluttDato, dugSluttTid, dugAnt});
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

				return res;
			})
			.catch((error:any) => {
      		return Observable.throw(new Error(error.status));
      });
	}
}	