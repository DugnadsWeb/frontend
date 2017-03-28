import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrgService } from '../../services/services';
import { Application } from '../../models/models';

@Component({
  selector: 'approve-org-application',
  templateUrl: './approve-org-application.component.html',
  styleUrls: ['./approve-org-application.component.css']
})
export class ApproveOrgApplicationComponent implements OnInit {

  @Input()
  uuid:string;

  // TODO quick fix! should be done through service. make this so during service refactoring.
  @Output()
  memberAdded = new EventEmitter();

  applications: Application[];

  constructor(private orgService: OrgService) { }

  ngOnInit() {
    this.orgService.getApplicants(this.uuid).subscribe(res => {
      this.applications = res;
    })
  }

  handleApplication(event){
    this.orgService.processApplication(event.application.user.email,
      this.uuid, event.action).subscribe(res => {
        console.log(res);
        let index = this.applications.indexOf(event.application);
        this.applications = this.applications.splice(index, 0);
        this.memberAdded.emit(event.application.user);
      })
  }

}
