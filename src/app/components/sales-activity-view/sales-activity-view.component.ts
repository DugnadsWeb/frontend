import {Component, OnInit, forwardRef, ChangeDetectorRef} from '@angular/core';
import { ActivityViewComponent } from '../activity-view/activity-view.component';
import { SalesActivityService, ActivityService, UserService, OrgService } from '../../services/services';
import { AssignProductsComponent } from '../assign-products/assign-products.component';
import { SetSoldAmmountComponent } from '../set-sold-ammount/set-sold-ammount.component';
import {Router} from "@angular/router";
import {DugnadService} from "../../services/dugnad.service";


@Component({
  selector: 'sales-activity-view',
  templateUrl: './sales-activity-view.component.html',
  styleUrls: ['./sales-activity-view.component.css'],
  providers: [ ActivityService, SalesActivityService ]
})
export class SalesActivityViewComponent extends ActivityViewComponent implements OnInit {

  // dialog-container components
  assignProductsComponent = AssignProductsComponent;
  setSoldAmmountComponent = SetSoldAmmountComponent;

  constructor( private salesActivityService: SalesActivityService,
    orgService:OrgService, userService: UserService, activityService: ActivityService, dugnadService: DugnadService) {
      super(activityService, userService, orgService, dugnadService);
    }

  ngOnInit() {
    super.ngOnInit();
  }

}
