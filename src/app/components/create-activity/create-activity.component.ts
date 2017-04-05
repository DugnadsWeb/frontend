import { Component, OnInit } from '@angular/core';
import { Activity } from '../../models/models';
import { ActivityService } from '../../services/services';

@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.css']
})
export class CreateActivityComponent implements OnInit {

  data:any;

  title;
  description;
  maxPartisipants
  startTime;
  startDate;
  endTime;
  endDate;

  constructor(private activityService: ActivityService) { }

  ngOnInit() {

  }

  onSubmit(){


    let st = this.startTime.split(':');
    let sd = this.startDate.split('-');
    let et = this.endTime.split(':');
    let ed = this.endDate.split('-');

    let startTime = new Date(+sd[0], +sd[1], +sd[2], +st[0], +st[1]).getTime();
    let endTime = new Date(+ed[0], +ed[1], +ed[2], +et[0], +et[1]).getTime();


    let activity = new Activity(null, this.title,
      startTime,
      endTime,
      this.description, this.maxPartisipants);

    this.activityService.postActivity(activity, this.data.dugnadUuid)
      .subscribe();

  }

}
