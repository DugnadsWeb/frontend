import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivityService } from '../../services/services';
import { User } from '../../models/models';
import { Subscription } from 'rxjs';
import { Dialogable } from '../dialog-container/dialog-container.component';

@Component({
  selector: 'app-attendants-list',
  templateUrl: './attendants-list.component.html',
  styleUrls: ['./attendants-list.component.css']
})
export class AttendantsListComponent implements OnInit, Dialogable {

  events: EventEmitter<any> = new EventEmitter();
  data:any;

  attendants: User[];
  attendantsSubscription: Subscription;

  constructor(private activityService: ActivityService) {}

  ngOnInit() {
    this.activityService.getAttendants().then(observable => {
      this.attendantsSubscription = observable.subscribe(attendants => {
        this.attendants = attendants;
        console.log(this.attendants);
      })
    })
  }

}
