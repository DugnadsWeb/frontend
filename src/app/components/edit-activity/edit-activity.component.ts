import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivityService } from '../../services/services';
import { Subscription } from 'rxjs';
import { Activity } from '../../models/models';
import { Dialogable } from '../dialog-container/dialog-container.component';

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.component.html',
  styleUrls: ['./edit-activity.component.css']
})
export class EditActivityComponent implements OnInit, Dialogable {

  events = new EventEmitter<any>();
  data:any;

  activityServiceInitSubscription: Subscription
  activity: Activity;
  activitySubscription: Subscription;

  startTime
  startDate
  endTime
  endDate

  constructor(private activityService: ActivityService) { }

  ngOnInit() {
    this.activityService.isInitObservable().then(observable => {
      this.activityServiceInitSubscription = observable.subscribe(isInit => {
        if (isInit){
          //this.activityServiceInitSubscription.unsubscribe();
          this.activityService.getActivityObservable().then(observable => {
            this.activitySubscription = observable.subscribe(activity => {
              this.activity = activity;

              let times = activity.getTimeAsHTMLDateFormat();
              this.startTime = times.start.time;
              this.startDate = times.start.date;
              this.endTime = times.end.time;
              this.endDate = times.end.date;

            }, err => console.log(err))
          })
          this.activityServiceInitSubscription.unsubscribe();
        }
      })
    }).catch(err => console.log(err))
  }

  onSubmit(){
    this.activity.setStartTimeFromDateTimeString(this.startTime, this.startDate);
    this.activity.setEndTimeFromDateTimeString(this.endTime, this.endDate);
    this.activityService.updateActivity(this.activity);
    this.events.emit({type: 'close'});
  }

}
