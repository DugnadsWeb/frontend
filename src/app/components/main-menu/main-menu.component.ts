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
	  var btn = document.getElementById("logoutBTN2");
	  
	  if(!token || token === null){
		  btn.innerHTML="Logg in";  
	  }
	  else if(token){
		  btn.innerHTML="Logg ut";  
	  }
	  
  }
  onSubmit(event){
	    var btn = document.getElementById("logoutBTN2");
	  if(btn.innerHTML=="Logg in"){
		  this.router.navigate(['/login']);		  
	  }  
	  else if(btn.innerHTML=="Logg ut"){
  		this.authService.logout();
  		this.router.navigate(['']);
		}
  }

}
