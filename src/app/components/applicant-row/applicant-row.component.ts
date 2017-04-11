import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/models';
import { OrgService } from '../../services/services';

@Component({
  selector: 'applicant-row',
  templateUrl: './applicant-row.component.html',
  styleUrls: ['./applicant-row.component.css']
})
export class ApplicantRowComponent implements OnInit {

  @Input()
  applicant: User;



  constructor(private orgService:OrgService) { }

  ngOnInit() {
  }

  acceptApplication(){
    this.orgService.acceptApplication(this.applicant);
  }

  rejectApplication(){
    this.orgService.rejectApplication(this.applicant);
  }


}
