import { Component, OnInit, Input } from '@angular/core';
import { Activity, User } from '../../models/models';
import { ActivityService, UserService } from '../../services/services';


@Component({
  selector: 'activity-view',
  templateUrl: './activity-view.component.html',
  styleUrls: ['./activity-view.component.css'],
  providers: [ActivityService]
})
export class ActivityViewComponent implements OnInit {

  @Input()
  activity: Activity;

  attendants: User[];

  isUserApplied:boolean;

  startTime;
  endTime;

  constructor(private activityService: ActivityService,
    private userService: UserService) { }

  ngOnInit() {
    let times = this.activity.getTimesAsObeject();
    this.startTime = times[0];
    this.endTime = times[1];

    this.activityService.init(this.activity.uuid);

    // subscribe to activities attendants
    this.activityService.getAttendants().then(res => {
      res.subscribe(res => {
        this.attendants = res;
        this.checkIfUserApplied();
      })
    })


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


}
