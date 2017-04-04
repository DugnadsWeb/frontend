import { Component, OnInit, Input, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { CreateActivityComponent } from '../create-activity/create-activity.component';
import { Activity } from '../../models/models';
import { DugnadService } from '../../services/services';
import { ActivityViewComponent } from '../activity-view/activity-view.component';

@Component({
  selector: 'activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {

  @Input()
  orgUuid: string;

  @Input()
  dugnadUuid: string;

  activities: Activity[];
  component = CreateActivityComponent;
  // TODO replace with auth service
  isAdmin = true;

  constructor(private dugnadService: DugnadService) {

  }

  ngOnInit() {
    this.dugnadService.getActivities(this.dugnadUuid).subscribe(res => {
      this.activities = res;
      console.log(res);
    });
  }

  makeDugnad(){

  }

}
