import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable} from 'rxjs/Rx';

@Injectable()
export class OrgService {

  constructor(private http: Http) { }

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
}
