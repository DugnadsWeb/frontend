import { Component, OnInit,Input } from '@angular/core';
import { Organization, User } from '../../models/models';
import { OrgService } from '../../services/services';

@Component({
  selector: 'org-admin-assigner',
  templateUrl: './org-admin-assigner.component.html',
  styleUrls: ['./org-admin-assigner.component.css']
})
export class OrgAdminAssignerComponent implements OnInit {

  @Input()
  uuid: string;

  members: User[];

  constructor(private orgService: OrgService) { }

  ngOnInit() {
    this.orgService.getMembers(this.uuid).subscribe(res => {
      this.members = res;
    });
  }

  assignAdmin(event, member){
    this.orgService.editAdminRights(this.uuid, member.email, true).subscribe(res => {
      let index = this.members.indexOf(member);
      this.members.splice(index,1);
      console.log(this.members);
    })
  }

}
