import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrgService } from '../../services/services';
import { User } from '../../models/models';

@Component({
  selector: 'approve-org-application',
  templateUrl: './approve-org-application.component.html',
  styleUrls: ['./approve-org-application.component.css']
})
export class ApproveOrgApplicationComponent implements OnInit {

  // TODO remove, replaced in org service
  @Input()
  uuid:string;

  // TODO quick fix! should be done through service. make this so during service refactoring.
  @Output()
  memberAdded = new EventEmitter();

  public applicants: User[];

  constructor(private orgService: OrgService) { }

  ngOnInit() {
    this.orgService.getApplicantsObersvable().then(observable => observable.subscribe(applicants => {
      this.applicants = applicants
    }))
  }

  handleApplication(event){
      if (event.action){
        this.orgService.acceptApplication(event.user);
      } else {
        this.orgService.rejectApplication(event.user);
      }
  }

}
