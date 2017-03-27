import { Component, OnInit, Input } from '@angular/core';
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

  applications: Application[];

  constructor(private orgService: OrgService) { }

  ngOnInit() {
    this.orgService.getApplicants(this.uuid).subscribe(res => {

      this.applications = res;
    })
  }

}
