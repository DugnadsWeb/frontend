import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from '../../services/auth.service';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'dw-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	jwt_decode = require('jwt-decode');
	first_name = "";
	last_name = "";
	email = "";


  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit() {

  	var token = window.localStorage.getItem('auth_token');
		var decoded = this.jwt_decode(token);
		console.log(decoded);
		
		this.first_name = decoded.db_fields.first_name.data;
	  this.last_name = decoded.db_fields.last_name.data;
		this.email = decoded.db_fields.email.data;
  	
  	}

  onSubmit(event){
  		this.authService.logout();
  		this.router.navigate(['']);
  }
  
}
