import { Component, OnInit, Input} from '@angular/core';
import { User } from '../../models/models';
import { UserService } from '../../services/services';
import {count} from "rxjs/operator/count";


@Component({
  selector: 'user-box',
  templateUrl: './user-box.component.html',
  styleUrls: ['./user-box.component.css']
})
export class UserBoxComponent implements OnInit {

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
