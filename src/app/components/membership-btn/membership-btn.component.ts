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
    this.userService.hasAppliedTo(this.uuid).subscribe(ret => {
      this.hasApplied = ret;
      this.isMember = this.authService.isMemberOf(this.uuid);
      console.log(this.hasApplied);
      console.log(this.isMember);
    });
  }

  apply(){
    this.orgService.applyTo(this.authService.getDecodedToken().email,
      this.uuid).subscribe(res => {
        console.log(res);
        this.hasApplied = true;
      })
  }

  canclMembership(){
    this.orgService.removeMember(this.authService.getDecodedToken().email,
      this.uuid).subscribe(ret => {
        this.isMember = false;
      });
  }

}
