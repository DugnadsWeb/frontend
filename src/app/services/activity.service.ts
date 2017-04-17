import { Injectable } from '@angular/core';
import { Activity, User } from '../models/models';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthService } from '../services/services';
import { Observable, BehaviorSubject, Subject } from 'rxjs';


@Injectable()
export class ActivityService {

  private activityId: string;
  private activity: Activity;
  private activitySubject: BehaviorSubject<Activity>;
  private isInitSubject = new BehaviorSubject<boolean>(false);

  private attendantsSource: BehaviorSubject<User[]>;
  public attendants: User[];




  constructor(private authService: AuthService,
    private http: Http) { }

  // needs to be called before other usage
  init(activityId: string){
    this.activityId = activityId;
    this.getActivity().subscribe(activity => {
      this.activity = activity;
      this.activitySubject = new BehaviorSubject<Activity>(Object.assign(new Activity('','','','','',''), this. activity));
      this.isInitSubject.next(true);
    })
  }

  // observable to see if activity is loaded
  isInitObservable(){
    return new Promise<Observable<boolean>>((res, rej) => {
      res(this.isInitSubject.asObservable());
    });
  }

  getActivityObservable(){
    return new Promise<Observable<Activity>>((res, rej) => {
      if (!this.activity) { rej("ActivityService is not initiated") }
      res(this.activitySubject.asObservable());
    });
  }

  updateActivity(activity: Activity){
    // TODO implement!
    // and notifiy dugnad;
    this.putApplication(activity).subscribe(() => {
      this.activity = Object.assign(new Activity('','','','','',''), activity);
      this.activitySubject.next(this.activity);
    })
  }

  // initializes the attendants list
  getAttendants(){
    return new Promise<Observable<User[]>>((res, rej) => {
      if (!this.attendants){
        let subscriber = this.getAttendantsHttp().subscribe(ret => {
          this.attendants = ret;
          this.attendantsSource = new BehaviorSubject<User[]>(ret);
          subscriber.unsubscribe();
          res(this.attendantsSource.asObservable());
        });
      } else {
        res(this.attendantsSource.asObservable());
      }
    })
  }

  addAttendant(user: User){
    console.log(this.activityId);
    let subscription = this.postApplication(user, true).subscribe(res => {
      this.attendants.push(user);
      this.attendantsSource.next(this.attendants);
      subscription.unsubscribe();
    });
  }

  removeAttendant(user: User){
    let subscription = this.postApplication(user, false).subscribe(res => {
      for (let i=0;i<this.attendants.length;i++){
        if (user.email == this.attendants[i].email){
          this.attendants.splice(i, 1);
          console.log(this.attendants);
          this.attendantsSource.next(this.attendants);
          subscription.unsubscribe();
          return;
        }
      }
    });
  }

  // #############
  // HTTP calls ##
  // #############



  postApplication(user:User, action:boolean){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
		headers.append('authorization', 'Bearer ' + this.authService.getToken());
    let body = JSON.stringify({
      activity: { uuid: this.activityId},
      user: { email: user.email },
      action: action
    });
    return this.http
      .post(
      'http://localhost:8888/api/activity/apply',
      body,
      { headers }
    )
    .map(res => res.json())
    .map((res) => {
      if (res) {
        console.log(res);
      }
      return res;
      }).catch((error:any) => {
        console.log(error);
      	return Observable.throw(new Error(error));
      });
  }


  putApplication(activity: Activity){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
		headers.append('authorization', 'Bearer ' + this.authService.getToken());
    let body = JSON.stringify({
      activity: activity
    });
    return this.http
      .put(
      'http://localhost:8888/api/activity/',
      body,
      { headers }
    )
    .map(res => res.json())
    .map((res) => {
      if (res) {
        console.log(res);
      }
      return res;
      }).catch((error:any) => {
        console.log(error);
      	return Observable.throw(new Error(error));
      });
  }

  getActivity(){
    let headers = new Headers();
		headers.append('authorization', 'Bearer ' + this.authService.getToken());
    return this.http
      .get(
        'http://localhost:8888/api/activity/'+this.activityId,
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return new Activity(res.uuid, res.title, res.startTime,
          res.endTime, res.description, res.maxPartisipants);
      });
  }

  private getAttendantsHttp(){
    let headers = new Headers();
		headers.append('authorization', 'Bearer ' + this.authService.getToken());
    return this.http
      .get(
        'http://localhost:8888/api/activity/attendants/'+this.activityId,
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        let ret = [];
        for (let i=0;i<res.length;i++){
          ret.push(new User(res[i].email, res[i].firstName,
            res[i].lastName, res[i].phone));
        }
        return ret;
      });
  }



}
