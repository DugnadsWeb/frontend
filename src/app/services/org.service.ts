import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable} from 'rxjs/Rx';

@Injectable()
export class OrgService {

  constructor(private http: Http) { }

	/*
	* Register a new organization.
	*/

	registerorg(org_number, org_name, email, phone, org_description)
	{
		let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if(!org_description)
    {
    	console.log(org_description);
    	org_description = "Ingen beskrivelse av organisasjonen";	
    }
    let body = JSON.stringify({ org_number, org_name, email, phone, org_description });
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
}
