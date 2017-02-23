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

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
  	
  	if(this.authService.isLoggedIn())
  	{
  		console.log('You are logged in');	
  	}
  	
  	var token = window.localStorage.getItem('auth_token');
  	
  	/*if(token)
  	{
  		$.ajaxSetup({
  			headers: {
  				'x-access-token': token
  			}
  		});	
  	}*/
  	
  	console.log(token);
  	
  	this.userService.getData(token).subscribe((result) => {
  		if(result){
  			console.log("Something arrives, not correct JSON");	
  		}
  	});
  	
  	/*this.userService.getData(this.email).subscribe((result) => 
  	{
        if (result) 
        {
          this.router.navigate(['']);
        }
    });*/
  }
}


