import { Injectable } from '@angular/core';
import { Activity, User } from '../models/models';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthService } from '../services/services';
import { Observable, BehaviorSubject, Subject } from 'rxjs';


@Injectable()
export class ActivityService {

  private activityId: string;

  private attendantsSource: BehaviorSubject<User[]>;
  public attendants: User[];




  constructor(private authService: AuthService,
    private http: Http) { }

  // needs to be called before other usage
  init(activityId: string){
    this.activityId = activityId;
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

  getActivity(activityId){
    let headers = new Headers();
		headers.append('authorization', 'Bearer ' + this.authService.getToken());
    return this.http
      .get(
        'http://localhost:8888/api/activity/'+activityId,
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
        console.log("http-ret: " + res);
        let ret = [];
        for (let i=0;i<res.length;i++){
          ret.push(new User(res.email, res.firstName,
            res.lastName, res.phone));
        }
        return ret;
      });
  }



}
