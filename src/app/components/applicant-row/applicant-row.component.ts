import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Application, User } from '../../models/models';

@Component({
  selector: 'applicant-row',
  templateUrl: './applicant-row.component.html',
  styleUrls: ['./applicant-row.component.css']
})
export class ApplicantRowComponent implements OnInit {

  @Input()
  application: Application;

  @Output()
  handle = new EventEmitter();

  user: User;
  time:any = {};

  constructor() { }

  ngOnInit() {
    this.user = this.application.user;
    let time = new Date(+this.application.appliedTime);
    this.time.d = time.getDate();
    this.time.m = time.getMonth()+1;
    this.time.y = time.getFullYear();
  }

  handleApplicant(event, action){
    this.handle.emit({application:this.application, action:action})
  }

}
