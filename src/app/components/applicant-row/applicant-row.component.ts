import { Component, OnInit, Input } from '@angular/core';
import { Application, User } from '../../models/models';

@Component({
  selector: 'applicant-row',
  templateUrl: './applicant-row.component.html',
  styleUrls: ['./applicant-row.component.css']
})
export class ApplicantRowComponent implements OnInit {

  @Input()
  application: Application;

  user: User;
  time;

  constructor() { }

  ngOnInit() {
    this.user = this.application.user;
    let time = new Date(this.application.appliedTime);
    this.time.d = time.getDate();
    this.time.m = time.getMonth()+1;
    this.time.y = time.getFullYear();
  }

}
