import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthService } from './auth.service';
import { ActivityService } from './activity.service';
import { UserService } from './user.service';
import { User, Activity } from '../models/models';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';

export class SalesStat {
  constructor (public user: User, public product: number, public sold: number){}
}

@Injectable()
export class SalesActivityService{

  acttivity: Activity;
  isActivityServiceInit = false;
  isActivityServiceInitSubscription: Subscription;


  activitySalesStats: SalesStat[];
  activitySalesStatsSubject: BehaviorSubject<SalesStat[]>;

  constructor(private authService: AuthService,
     private activityService: ActivityService, private http:Http) {
  }

  getSalesStats(){
    return new Promise<Observable<SalesStat[]>>((res, rej) => {
      if (!!this.activitySalesStats) {
        res(this.activitySalesStatsSubject.asObservable());
        return;
      }
      this.getActivityPromise().then(activity => {
        this.httpGetActivitySalesStats(activity.uuid).subscribe(salesStats => {
          this.activitySalesStats = salesStats;
          this.activitySalesStatsSubject = new BehaviorSubject(Object.assign([], this.activitySalesStats));
          res(this.activitySalesStatsSubject.asObservable());
        })
      })
    })
  }

  registerProduct(user:User, ammount:number){
    this.getActivityPromise().then(activity => {
      this.activitySalesStats.forEach(val => {
        if (val.user.email == user.email) {
          val.product = ammount;
          this.activitySalesStatsSubject.next(Object.assign([], this.activitySalesStats));
        }
      })
      this.httpPostProduct(user, activity, ammount).subscribe();
    })
  }

  registerSale(user:User, ammount: number){
    this.getActivityPromise().then(activity => {
      this.activitySalesStats.forEach(val => {
        if (val.user.email == user.email) {
          val.sold = ammount;
          this.activitySalesStatsSubject.next(Object.assign([], this.activitySalesStats));
        }
      })
      this.httpPostSales(user, activity, ammount).subscribe();
    })
  }

  updateStats(){
    this.getActivityPromise().then(activity => {
      this.httpGetActivitySalesStats(activity.uuid).subscribe(salesStats => {
        this.activitySalesStats = salesStats;
        this.activitySalesStatsSubject = new BehaviorSubject(Object.assign([], this.activitySalesStats));
      })
    })
  }

  private getActivityPromise(){
    return new Promise<Activity>((res, rej) => {
      this.activityService.isInitObservable().then(observable => {
        let initSubscription = observable.subscribe(isInit => {
          if (isInit){
            this.activityService.getActivityObservable().then(observable => {
              let activitySubscription = observable.subscribe(activity => {
                res(activity);
                initSubscription.unsubscribe();
                activitySubscription.unsubscribe();
              })
            })
          }
        })
      })
    })
  }


  // #############
  // HTTP calls ##
  // #############

  private httpGetActivitySalesStats(activityId){
    let headers = new Headers();
		headers.append('authorization', 'Bearer ' + this.authService.getToken());
    return this.http
      .get(
        'http://localhost:8888/api/activity/sales/stats/' + activityId,
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        let ret = [];
        console.log(res);
        for (let i=0;i<res.length;i++){

          let u = res[i].user;
          let stat = new SalesStat(new User(u.email, u.firstName,
            u.lastName, u.phone), res[i].product, res[i].sold);
          ret.push(stat);
        }
        return ret;
      }).catch((err:any) => {
        console.log(err);
      	return Observable.throw(new Error(err));
      })
  }

  private httpPostSales(user:User, activity:Activity, ammount:number){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
		headers.append('authorization', 'Bearer ' + this.authService.getToken());
    let body = JSON.stringify({
      activity: { uuid: activity.uuid},
      user: { email: user.email },
      ammount: ammount
    });
    return this.http
      .post(
      'http://localhost:8888/api/activity/sales/set-items-sold',
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


  private httpPostProduct(user:User, activity:Activity, ammount:number){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
		headers.append('authorization', 'Bearer ' + this.authService.getToken());
    let body = JSON.stringify({
      activity: { uuid: activity.uuid},
      user: { email: user.email },
      ammount: ammount
    });
    return this.http
      .post(
      'http://localhost:8888/api/activity/sales/set-member-supply',
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


}
