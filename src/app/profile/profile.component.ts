import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from '../services/auth.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'dw-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	first_name = "";
	last_name = "";
	email = "";
	
	
  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
  	
  	if(this.authService.isLoggedIn())
  	{
  		console.log('You are logged in');	
  	}
  	
  	var token = window.localStorage.getItem('auth_token');
  	
  	this.userService.getData(token).subscribe((result) => {
  		if(result){
  			this.first_name = result.payload.db_fields.first_name.data;
  		  this.last_name = result.payload.db_fields.last_name.data;
  			this.email = result.payload.db_fields.email.data;
  		}
  	});
  	
  }
  
  
}


