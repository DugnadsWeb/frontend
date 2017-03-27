import { Component, OnInit } from '@angular/core';
import { OrgService, AuthService } from '../../services/services';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Organization, User } from '../../models/models';
import { OrgInfoComponent } from '../../components/org-info/org-info.component';
import { MembersListComponent } from '../../components/members-list/members-list.component';
import { OrgMessageBoardComponent } from '../../components/org-message-board/org-message-board.component';
import { MembershipBtnComponent } from '../../components/membership-btn/membership-btn.component';
import { OrgAdminPanelComponent } from '../../components/org-admin-panel/org-admin-panel.component';


@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {


  org: Organization;
  members: User[];
  admins: User[];
  isAdmin: boolean;

  constructor(private orgService: OrgService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) {

  }


  ngOnInit() {
    this.route.params
    .switchMap((params: Params) => this.orgService.getOrg(params['id']))
    .subscribe((org: Organization) => this.org = org);

    this.route.params
    .switchMap((params: Params) => this.orgService.getMembers(params['id']))
    .subscribe((members: User[]) => this.members = members);

    this.route.params
    .switchMap((params: Params) => this.orgService.getAdmins(params['id']))
    .subscribe((admins: User[]) => this.admins = admins);

    this.route.params.subscribe(params => {
       this.isAdmin = this.authService.isAdminOf(params['id']);
       console.log(this.authService.isAdminOf(params['id']));
    });

  }

}
