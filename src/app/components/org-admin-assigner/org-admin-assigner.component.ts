import { Component, OnInit,Input } from '@angular/core';
import { Organization, User } from '../../models/models';
import { OrgService } from '../../services/services';

@Component({
  selector: 'org-admin-assigner',
  templateUrl: './org-admin-assigner.component.html',
  styleUrls: ['./org-admin-assigner.component.css']
})
export class OrgAdminAssignerComponent implements OnInit {

  // TODO remove, its replaced by service
  @Input()
  uuid: string;

  members: User[];

  constructor(private orgService: OrgService) { }

  ngOnInit() {
    this.orgService.getMembersObservable().then(observable => observable.subscribe(members => {
      this.members = members;
    }));
  }

  assignAdmin(event, member){
    this.orgService.promoteMemberToAdmin(member);
  }

}
