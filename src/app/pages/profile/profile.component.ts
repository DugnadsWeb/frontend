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

	first_name = "";
	last_name = "";
	email = "";


  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit() {

  	var token = window.localStorage.getItem('auth_token');


  	//TODO: Just return data on login, dont need to call getData on the token.
  	this.userService.getData(token).subscribe((result) => {
  		if(result){
  			this.first_name = result.payload.first_name;
  		  this.last_name = result.payload.last_name;
  			this.email = result.payload.email;
  		}
  	});

  }

  onSubmit(event){
  		this.authService.logout();
  		this.router.navigate(['']);
  }
}
