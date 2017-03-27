import { Component, OnInit, Input } from '@angular/core';
import { AuthService, OrgService, UserService } from '../../services/services';

@Component({
  selector: 'membership-btn',
  templateUrl: './membership-btn.component.html',
  styleUrls: ['./membership-btn.component.css']
})
export class MembershipBtnComponent implements OnInit {

  @Input()
  uuid:string;
  isMember:boolean;
  hasApplied:boolean;

  constructor(private authService:AuthService,
    private orgService:OrgService,
    private userService: UserService) { }

  ngOnInit() {
    this.isMember = this.authService.isMemberOf(this.uuid);
    this.userService.hasAppliedTo(this.uuid).subscribe(ret => {
      this.hasApplied = ret;
    });
  }

  apply(){
    this.orgService.applyTo(this.authService.getDecodedToken().email,
      this.uuid).subscribe(res => {
        console.log(res);
      })
  }

  canclMembership(){
    this.orgService.removeMember(this.authService.getDecodedToken().email,
      this.uuid).subscribe(ret => {
        this.isMember = false;
      });
  }

}
