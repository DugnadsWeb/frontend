import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserBoxComponent } from '../user-box/user-box.component';
import { User } from '../../models/models';
import { UserService } from '../../services/services';

@Component({
  selector: 'members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {

  @Input()
  users: User[];

  @Input()
  title:string;

  constructor(private userService : UserService) { }

  ngOnInit() {
  	for(var i = 0; i < this.users.length; i++)
  	{
  		this.userService.getPicture(this.users[i].email).subscribe((result) => {
  				
  		});
  	}
  }

}
