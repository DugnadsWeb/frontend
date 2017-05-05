import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {Observable, Subject, BehaviorSubject} from "rxjs";
import {AuthService} from "./auth.service";
import { environment } from '../../environments/environment';

@Injectable()
export class PrintService {

  constructor(private http: Http, private authService: AuthService) { }

  private printerInfo : any[];
  private printerInfoSource : BehaviorSubject<any[]>;


  init(uuid){
    return new Promise((res, rej) => {
      let subscription = this.getPrintInfo(uuid).subscribe(info => {
        this.printerInfo = info;
        this.printerInfoSource = new BehaviorSubject(info);

        subscription.unsubscribe();
        res();
      });
    });
  }

  getPrintInfo(uuid){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('authorization', 'Bearer ' + this.authService.getToken());
    return this.http
      .get(
        environment.API_URL + '/dugnad/print/'+uuid,
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res;
      })
      .catch((error:any) => {
        if(error.status == 400)
        {
          return Observable.throw(new Error(error.status));
        }
      });
  }

  getInfo(){
    return new Promise<Observable<any>>((res, rej) => {
      res(this.printerInfoSource.asObservable());
    });
  }
}
