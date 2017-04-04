import { Injectable } from '@angular/core';
import { Activity, User } from '../models/models';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthService } from '../services/services';
import { Observable, Subject } from 'rxjs';


@Injectable()
export class ActivityService {


  private activitySource = new Subject<Activity>();
  private attendantsSource = new Subject<User[]>();


  // test
  private testSource = new Subject<string>();
  public test = this.testSource.asObservable();


  constructor(private authService: AuthService,
    private http: Http) { }


  addToTest(thing){
    //this.test.push(thing);
  }


  postActivity(activity: Activity, dugnadId: string){
    delete activity.uuid;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('authorization', 'Bearer ' + this.authService.getToken());
    let body = JSON.stringify({activity:activity, dugnad: {uuid:dugnadId}});
    console.log(body);
    return this.http
      .post(
      'http://localhost:8888/api/activity/',
      body,
      { headers }
    )
    .map(res => res.json())
    .map((res) => {
      if (res) {
        console.log("Activity created succesfully");
      }
      return res;
      }).catch((error:any) => {
        console.log(error);
      	return Observable.throw(new Error(error));
      });

  }


}
