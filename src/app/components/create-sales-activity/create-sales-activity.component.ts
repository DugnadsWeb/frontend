import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Activity } from '../../models/models';
import { DugnadService } from '../../services/services';


@Component({
  selector: 'app-create-sales-activity',
  templateUrl: './create-sales-activity.component.html',
  styleUrls: ['./create-sales-activity.component.css']
})
export class CreateSalesActivityComponent implements OnInit {


  data:any;
  events = new EventEmitter<any>();


  title;
  description;
  maxPartisipants
  startTime;
  startDate;
  endTime;
  endDate;
  product;

  constructor(private dugnadService: DugnadService) { }

  ngOnInit() {

  }

  onSubmit(){
    let activity = new Activity(null, this.title,
      Activity.fromStringToTime(this.startTime, this.startDate),
      Activity.fromStringToTime(this.endTime, this.endDate),
      this.description, this.maxPartisipants);

    this.dugnadService.addActivity(activity);
    this.events.emit({type:"created"});
    this.events.emit({type:"close"});
  }

}
