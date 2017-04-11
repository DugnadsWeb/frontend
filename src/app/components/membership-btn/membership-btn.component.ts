import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AuthService, OrgService, UserService } from '../../services/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'membership-btn',
  templateUrl: './membership-btn.component.html',
  styleUrls: ['./membership-btn.component.css']
})
export class MembershipBtnComponent implements OnInit, OnDestroy {

  @Input()
  uuid:string;

  isAdmin:boolean;
  isAdminSubscription: Subscription;
  isMember:boolean;
  isMemberSubscription: Subscription;
  isApplied:boolean;
  isAppliedSubscription: Subscription;



  constructor(private authService:AuthService,
    private orgService:OrgService,
    private userService: UserService) { }

  ngOnInit() {
    this.orgService.isUserMemberObservable().then(observable => {
      this.isMemberSubscription = observable.subscribe(isMember => {
        this.isMember = isMember;
      });
    });
    this.orgService.isUserApplicantObservable().then(observable => {
      this.isAppliedSubscription = observable.subscribe(isApplied => {
        this.isApplied = isApplied;
      });
    });
    this.orgService.isUserAdminObservable().then(observable => {
      this.isAdminSubscription = observable.subscribe(isAdmin => this.isAdmin = isAdmin);
    });
  }

  ngOnDestroy(){
    this.isMemberSubscription.unsubscribe();
    this.isAppliedSubscription.unsubscribe();
  }

  apply(){
    this.orgService.addApplication(this.userService.getUser()).then();
  }


  cancleMembership(){
    this.orgService.removeMember(this.userService.getUser()).then();
  }

}
