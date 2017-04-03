import { Component, OnInit, Input} from '@angular/core';
import { User } from '../../models/models';
import { UserService } from '../../services/services';


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
  	var ptags = document.getElementsByClassName("UserPTag").length;
  	for(var i = 0; i < ptags; i++)
  	{
  		this.userService.getPicture(this.user.email).subscribe((result) => {
  				this.profilePic = result[0]; 
  		});
  	}
  }

}
