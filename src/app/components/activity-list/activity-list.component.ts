import { Component, OnInit, Input, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ActivityToCreateSelectorComponent } from '../activity-to-create-selector/activity-to-create-selector.component';
import { Activity } from '../../models/models';
import { OrgService, DugnadService, ActivityService } from '../../services/services';
import { ActivityViewComponent } from '../activity-view/activity-view.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {


  activities: Activity[];
  activitiesSubscription: Subscription;
  component = ActivityToCreateSelectorComponent;
  // TODO replace with auth service
  isAdmin = true;
  isAdminSubscription: Subscription;

  isOrgServiceInitSubscription: Subscription;

  constructor(private dugnadService: DugnadService,
    private orgService: OrgService) {

  }

  ngOnInit() {
    this.isOrgServiceInitSubscription = this.orgService.getIsInitObservable().subscribe(observable => {
      this.dugnadService.getActivities().then(observable => {
        this.activitiesSubscription = observable.subscribe(activities => this.activities = activities);
      });
      this.orgService.isUserAdminObservable().then(observable => {
        this.isAdminSubscription = observable.subscribe(isAdmin => this.isAdmin = isAdmin);
      });
    })
  }


}
