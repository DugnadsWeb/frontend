import {Component, OnInit, OnDestroy, Input, ChangeDetectorRef} from '@angular/core';
import { Activity, User } from '../../models/models';
import { ActivityService, UserService, OrgService } from '../../services/services';
import { DialogContainerComponent } from '../dialog-container/dialog-container.component';
import { MembersListComponent } from '../members-list/members-list.component';
import { Subscription } from 'rxjs';
import { AttendantsListComponent } from '../attendants-list/attendants-list.component';
import { EditActivityComponent } from '../edit-activity/edit-activity.component';
import { AddMemberToActivityComponent } from '../add-member-to-activity/add-member-to-activity.component';
import { RemoveMemberFromActivityComponent } from '../remove-member-from-activity/remove-member-from-activity.component';
import {Router} from "@angular/router";
import {DugnadService} from "../../services/dugnad.service";

@Component({
  selector: 'activity-view',
  templateUrl: './activity-view.component.html',
  styleUrls: ['./activity-view.component.css'],
  providers: [ActivityService]
})
export class ActivityViewComponent implements OnInit, OnDestroy {

  @Input()
  activity: Activity;
  activitySubscription: Subscription;
  activityServiceInitSubscription: Subscription;

  orgServiceInitSubscription: Subscription;

  startTime;
  endTime;

  attendants: User[];
  attendantsSubscription: Subscription;

  isUserApplied:boolean;
  isUserAdmin:boolean;
  isUserAdminSubscription: Subscription;

  // dialog components
  attendantsListComponent = AttendantsListComponent;
  editActivityComponent = EditActivityComponent;
  addMemberToActivityComponent = AddMemberToActivityComponent;
  removeMemberFromActivityComponent = RemoveMemberFromActivityComponent;

  constructor(public activityService: ActivityService,
    private userService: UserService,
    private orgService: OrgService,
    private dugnadService: DugnadService) { }

  ngOnInit() {
    let times = this.activity.getTimesAsObeject();
    this.startTime = times[0];
    this.endTime = times[1];

    this.activityService.init(this.activity.uuid);


    // activity observable
    this.activityService.isInitObservable().then(observable => {
      this.activityServiceInitSubscription = observable.subscribe(isInit => {
        if (isInit){

          // subscribe to activities attendants
          this.activityService.getAttendants().then(res => {
            this.attendantsSubscription = res.subscribe(res => {
              this.attendants = res;
              this.checkIfUserApplied();
            })
          })
          // subscribe to activity
          this.activityService.getActivityObservable().then(observable => {
            this.activitySubscription = observable.subscribe(activity => {
              this.activity = activity;
              let times = activity.getTimesAsObeject();
              this.startTime = times[0];
              this.endTime = times[1];
            })
          }).catch(err => console.log(err));
          this.activityServiceInitSubscription.unsubscribe();
        }
      })
    })

    // orgObservable
    this.orgService.isInitObservable().then(observable => {
      this.orgServiceInitSubscription = observable.subscribe(isInit => {
        if (isInit){
          this.orgService.isUserAdminObservable().then(observable => {
            this.isUserAdminSubscription = observable.subscribe(isAdmin => {
              this.isUserAdmin = isAdmin;
            })
          })
          this.orgServiceInitSubscription.unsubscribe();
        }
      })
    })

  }

  ngOnDestroy(){
    if (!!this.attendantsSubscription)
      this.attendantsSubscription.unsubscribe();
    if (!!this.activitySubscription)
      this.activitySubscription.unsubscribe();
    if (!!this.isUserAdminSubscription)
      this.isUserAdminSubscription.unsubscribe();
  }

  checkIfUserApplied(){
    this.isUserApplied = false;
    let logedInUserEmail = this.userService.getUser().email;
    this.attendants.forEach(attendant => {
      if (logedInUserEmail == attendant.email){
        this.isUserApplied = true;

      }
    })
  }

  // ################
  // Event methods ##
  // ################

  applyTo(){
    this.isUserApplied = null;
    this.activityService.addAttendant(this.userService.getUser());
  }

  unapplyTo(){
    this.isUserApplied = null;
    this.activityService.removeAttendant(this.userService.getUser());
  }

  deleteActivity(uuid){
    this.dugnadService.removeActivity(uuid);
    //this.router.navigate([])
  }



}
