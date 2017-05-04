import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { Dialogable } from '../dialog-container/dialog-container.component';
import { ActivityService } from '../../services/services';
import { User } from '../../models/models';
import { Subscription } from 'rxjs';
import { UserBoxComponent } from '../user-box/user-box.component';


@Component({
  selector: 'app-remove-member-from-activity',
  templateUrl: './remove-member-from-activity.component.html',
  styleUrls: ['./remove-member-from-activity.component.css']
})
export class RemoveMemberFromActivityComponent implements OnInit, Dialogable, OnDestroy {

  events = new EventEmitter<any>();
  data:any;

  isActivityInitSubscription: Subscription;

  attendants: User[];
  attendantsSubscription: Subscription;

  selectedMembers: User[] = [];

  constructor(private activityService: ActivityService) { }

  ngOnInit() {
    this.activityService.isInitObservable().then(observable => {
      this.isActivityInitSubscription = observable.subscribe(isInit => {
        if (isInit){
          this.activityService.getAttendants().then(observable => {
            this.attendantsSubscription = observable.subscribe( attendants => {
              this.attendants = attendants;
            })
          })
          this.isActivityInitSubscription.unsubscribe();
        }
      })
    })
  }

  ngOnDestroy(){
    if(!!this.attendantsSubscription)this.attendantsSubscription.unsubscribe();
  }

  clickMember(member){
    let index = this.selectedMembers.indexOf(member);
    if (index == -1){
      this.selectedMembers.push(member);
    } else {
      this.selectedMembers.splice(index, 1);
    }
  }

  memberIsMarked(member): string{
    if (this.selectedMembers.indexOf(member) != -1){
      return '#a7edff';
    }
    return '#fff';
  }

  removeMembers(){
    for(let i=0;i<this.selectedMembers.length;i++){
      this.activityService.removeAttendant(this.selectedMembers[i]);
    }
    this.cancle();
  }

  cancle(){
    this.events.emit({type: 'close'});
  }

}
