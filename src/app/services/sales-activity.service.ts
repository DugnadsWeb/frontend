import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthService } from './auth.service';
import { ActivityService } from './activity.service';
import { UserService } from './user.service';
import { User, Activity } from '../models/models';
import { Subscription, BehaviorSubject } from 'rxjs';

@Injectable()
export class SalesActivityService{

  acttivity: Activity;
  isActivityServiceInit = false;
  isActivityServiceInitSubscription: Subscription;


  activitySalesStats: [{user: User, product: number, sales: number}];
  activitySalesStatsSubject

  constructor(private authService: AuthService,
     private activityService: ActivityService, private http:Http) {
    this.activityService.isInitObservable().then(observable => {
      this.isActivityServiceInitSubscription = observable.subscribe(isInit => {
        this.isActivityServiceInit = isInit;
        if(isInit){

          this.isActivityServiceInitSubscription.unsubscribe();
        }
      })
    })
  }








}
