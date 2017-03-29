import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthService } from './services';
import { Dugnad } from '../models/models';

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




}
