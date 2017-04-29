import { Component, OnInit, forwardRef } from '@angular/core';
import { ActivityViewComponent } from '../activity-view/activity-view.component';
import { SalesActivityService, ActivityService, UserService, OrgService } from '../../services/services';


@Component({
  selector: 'sales-activity-view',
  templateUrl: './sales-activity-view.component.html',
  styleUrls: ['./sales-activity-view.component.css'],
  providers: [ ActivityService, SalesActivityService ]
})
export class SalesActivityViewComponent extends ActivityViewComponent implements OnInit {

  constructor( private salesActivityService: SalesActivityService,
    orgService:OrgService, userService: UserService, activityService: ActivityService) {
      super(activityService, userService, orgService);
    }

  ngOnInit() {
    super.ngOnInit();
  }

}
