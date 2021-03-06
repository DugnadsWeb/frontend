import { Injectable, OnDestroy } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthService } from './auth.service';
import { ActivityService } from './activity.service';
import { UserService } from './user.service';
import { User, Activity } from '../models/models';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export class SalesStat {
  constructor (public user: User, public product: number, public sold: number){}
}

@Injectable()
export class SalesActivityService implements OnDestroy{

  activityAttendantsSubscription: Subscription;


  activitySalesStats: SalesStat[];
  activitySalesStatsSubject = new BehaviorSubject<SalesStat[]>([]);

  constructor(private authService: AuthService,
     private activityService: ActivityService, private http:Http) {
       console.log("salesac serv is construc")
       this.attendantsSubscriber();
  }

  ngOnDestroy(){
    if (this.activityAttendantsSubscription)
      this.activityAttendantsSubscription.unsubscribe();
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
          this.activitySalesStatsSubject.next(Object.assign([], this.activitySalesStats));
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
      });
      this.httpPostProduct(user, activity, ammount).subscribe(ret => console.log(ret));
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
    console.log('updateStats is vcalled')
    this.getActivityPromise().then(activity => {
      this.httpGetActivitySalesStats(activity.uuid).subscribe(salesStats => {
        this.activitySalesStats = salesStats;
        this.activitySalesStatsSubject.next(Object.assign([], this.activitySalesStats));
      })
    })
  }

  // ##################
  // private methods ##
  // ##################

  private getActivityPromise(){
    return new Promise<Activity>((res, rej) => {
      this.activityServiceIsInitPromise().then(() => {
        this.activityService.getActivityObservable().then(observable => {
          let activitySubscription = observable.subscribe(activity => {
            res(activity);
            activitySubscription.unsubscribe();
          })
        })
      })
    })
  }

  private activityServiceIsInitPromise(){
    return new Promise((res, rej) => {
      this.activityService.isInitObservable().then(observable => {
        let initSubscription = observable.subscribe(isInit => {
          if (isInit){
            res();
            initSubscription.unsubscribe();
          }
        })
      })
    })
  }

  private attendantsSubscriber(){
    this.activityServiceIsInitPromise(). then(() => {
      this.activityService.getAttendants().then(observable => {
        this.activityAttendantsSubscription = observable.subscribe(attendants => {
          this.updateStats();
        }, err => console.log(err), () => console.log("imout"))
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
        environment.API_URL + '/activity/sales/stats/' + activityId,
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
      environment.API_URL + '/activity/sales/set-items-sold',
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
      environment.API_URL + '/activity/sales/set-member-supply',
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
