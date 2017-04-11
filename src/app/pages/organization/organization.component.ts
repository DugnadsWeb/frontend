import { Component, OnInit } from '@angular/core';
import { OrgService, AuthService } from '../../services/services';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';
import { Organization, User } from '../../models/models';
import { OrgInfoComponent } from '../../components/org-info/org-info.component';
import { MembersListComponent } from '../../components/members-list/members-list.component';
import { OrgMessageBoardComponent } from '../../components/org-message-board/org-message-board.component';
import { MembershipBtnComponent } from '../../components/membership-btn/membership-btn.component';
import { OrgAdminPanelComponent } from '../../components/org-admin-panel/org-admin-panel.component';


@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css'],
  providers: [OrgService]
})
export class OrganizationComponent implements OnInit {


  org: Organization;
  orgSubscription: Subscription;
  members: User[];
  membersSubscription: Subscription;
  admins: User[];
  adminsSubscription: Subscription;
  isAdmin: boolean;
  memberPic: Array<any>;


  constructor(private orgService: OrgService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) {

  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.orgService.init(params['id']).then(() => {
        this.orgService.getOrgObservable().then(observ => this.orgSubscription = observ.subscribe(org => {this.org = org; console.log("org has changes") }));
        this.orgService.getMembersObservable().then(ret => this.membersSubscription = ret.subscribe(members => {
          this.members = members
        }, err => console.log(err)));
        this.orgService.getAdminsObservable().then(ret => this.adminsSubscription = ret.subscribe(admins => {
          this.admins = admins;
        }, err => console.log(err)));
        this.orgService.isUserAdminObservable().then(ret => ret.subscribe(isUserAdmin => this.isAdmin = isUserAdmin));
      })
    })

  }

  // TODO quick fix! should be done through service. make this so during service refactoring.
  memberAdded(event){
    console.log(event)
    this.members.push(event)
  }

}
