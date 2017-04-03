import { Component, OnInit, Input, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { CreateActivityComponent } from '../create-activity/create-activity.component';

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

  component = CreateActivityComponent;

  isAdmin = true;

  constructor() {

  }

  ngOnInit() {
  }

  makeDugnad(){

  }

}
