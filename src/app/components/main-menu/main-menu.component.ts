import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
	
	jwt_decode = require('jwt-decode');
	first_name = "";
	last_name = "";
	email = "";
	

  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }


  ngOnInit() {
	  var token = localStorage.getItem('auth_token');
	  
  }
  onSubmit(event){
  		this.authService.logout();
  		this.router.navigate(['']);
  }

}
