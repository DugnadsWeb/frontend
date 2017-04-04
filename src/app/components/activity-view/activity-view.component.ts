import { Component, OnInit, Input } from '@angular/core';
import { Activity } from '../../models/models';
import { ActivityService } from '../../services/services';


@Component({
  selector: 'activity-view',
  templateUrl: './activity-view.component.html',
  styleUrls: ['./activity-view.component.css']
})
export class ActivityViewComponent implements OnInit {

  @Input()
  activity: Activity

  test:any;

  startTime;
  endTime;

  constructor(private activityService: ActivityService) { }

  ngOnInit() {
    console.log(this.activity);
    let times = this.activity.getTimesAsObeject();
    this.startTime = times[0];
    this.endTime = times[1];

    this.test = this.activityService.test;
  }

  applyTo(){
    this.test = "applied";
    console.log(this.activityService.test);
  }

}
