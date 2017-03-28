import { Component, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService} from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { AuthGuardService } from '../services/auth-guard.service';
 

@Component({
  selector: 'dw-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	jwt_decode = require('jwt-decode');
	firstName = "";
	lastName = "";
	email = "";
	
	
  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }
    
  ngOnInit() {
  	this.getProfileData();
  }


	private getProfileData(){
		var token = localStorage.getItem('auth_token');
		var decoded = this.jwt_decode(token);
		this.firstName = decoded.firstName;
		this.lastName = decoded.lastName;
		this.email = decoded.email;
	}
  onSubmit(event){
  		this.authService.logout();
  		this.router.navigate(['']);
  }

}
