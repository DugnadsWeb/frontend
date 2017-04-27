import { Component, OnInit, Input } from '@angular/core';
import { OrgService, UserService } from '../../services/services';
import { Subscription } from 'rxjs';
import { User} from '../../models/models';
import {count} from "rxjs/operator/count";


@Component({
  selector: 'app-user-row',
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.css']
})
export class UserRowComponent implements OnInit{

@Input()
user: User;
profilePic = '../../../assets/img/placeholder_profile_pic.png';

  constructor(private userService: UserService) { }

  ngOnInit() {
	  if(this.user){
        this.userService.getPicture(this.user.email).subscribe((result) => {
            this.profilePic = result[0];
        });
      }
  }
}
