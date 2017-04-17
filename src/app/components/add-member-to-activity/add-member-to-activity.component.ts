import { Component, OnInit, EventEmitter } from '@angular/core';
import { User } from '../../models/models';
import { ActivityService, OrgService} from '../../services/services';
import { Subscription } from 'rxjs';
import { Dialogable } from '../dialog-container/dialog-container.component';
import { UserBoxComponent } from '../user-box/user-box.component';

@Component({
  selector: 'app-add-member-to-activity',
  templateUrl: './add-member-to-activity.component.html',
  styleUrls: ['./add-member-to-activity.component.css']
})
export class AddMemberToActivityComponent implements OnInit, Dialogable {

  data:any
  events = new EventEmitter<any>();

  activityServiceInit = false;
  activityIsInitSubscription: Subscription;
  orgServiceInit = false;
  orgIsInitSubscription: Subscription;

  attendants: User[] = [];
  attendantsSubscription: Subscription;

  members: User[] = [];
  membersSubscription: Subscription;
  admins: User[] = [];
  adminsSubscription: Subscription;

  selectedMembers: User[] = [];

  constructor(private activityService:ActivityService,
    private orgService: OrgService) { }

  ngOnInit() {
    this.activityService.isInitObservable().then( observable => {
      this.activityIsInitSubscription = observable.subscribe(isInit => {
        this.activityServiceInit = isInit;
        this.onServicesInit();
      })
    })
    this.orgService.isInitObservable().then( observable => {
      this.orgIsInitSubscription = observable.subscribe(isInit => {
        this.orgServiceInit = isInit;
        this.onServicesInit();
      })
    })
  }

  onServicesInit(){
    if (!this.activityServiceInit || !this.orgServiceInit) {return}
    // get activity attendants
    this.activityService.getAttendants().then(observable => {
      this.attendantsSubscription = observable.subscribe(attendants => {
        this.attendants = attendants;
      })
    });
    // get org members
    this.orgService.getMembersObservable().then(observable => {
      this.membersSubscription = observable.subscribe(members => {
        // add members not in attendants list
        this.addUserFromList(members)
      })
    });
    // get org admins
    this.orgService.getAdminsObservable().then(observable => {
      this.adminsSubscription = observable.subscribe(admins => {
        // add members not in attendants list
        this.addUserFromList(admins)
      })
    });
    this.activityIsInitSubscription.unsubscribe();
    this.orgIsInitSubscription.unsubscribe();
  }

  memberIsMarked(member): string{

    if (this.selectedMembers.indexOf(member) != -1){
      return '#a7edff';
    }
    return '#fff';
  }

  clickMember(member){
    let index = this.selectedMembers.indexOf(member);
    if (index == -1){
      this.selectedMembers.push(member);
    } else {
      this.selectedMembers.splice(index, 1);
    }
    this.selectedMembers = Object.assign([], this.selectedMembers);
  }

  addMembers(){
    for (let i=0;i<this.selectedMembers.length;i++){
      this.activityService.addAttendant(this.selectedMembers[i]);
    }
    this.events.emit({type: "close"});
  }

  private addUserFromList(users){
    for(let i=0;i<users.length;i++){
      let found = false;
      for(let j=0;j<this.attendants.length;j++){
        if (users[i].email == this.attendants[j].email){
          found = true;
          break;
        }
      }
      if (!found){
        this.members.push(users[i]);
      }
    }
  }

}
