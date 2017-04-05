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

	navBarElements = [];
	dropdownElements = [];
	dropdownRoutes = [];
	routerElements = [];
	atagsrc = "";


  constructor(private authService: AuthService, private userService: UserService, private router: Router)
  {
  	this.routerElements = ["login", "register", "register-org", "search", "info-hub"];
  	this.navBarElements = ["Login","Registrer Bruker", "Registrer Org", "Organisasjoner", "Oversikt"];
  	this.dropdownElements = ["Min Side"];
  	this.dropdownRoutes = ["profile"];

	  if(this.authService.getToken())
    {
      this.atagsrc = "Logg ut";
    }
	  else
    {
		  this.atagsrc ="Logg inn";
	  }
  }

  ngOnInit() {

  }

  loginOrOut(event)
  {
  	let btn = document.getElementById("logoutBTN");

  	if(btn.innerHTML === "Logg inn")
  	{

  		this.router.navigate(['/login']);

  	}
  	else if(btn.innerHTML === "Logg ut")
  	{

  		this.authService.logout();
  		this.router.navigate(['']);
  	}
  }

  routerHelper(clicked)
  {
  	let route = "";

  	if(clicked === this.dropdownElements[0])
  	{
  		route = this.dropdownRoutes[0];
  		this.router.navigate(["/" + route + ""]);
  	}
  	for(let i=0; i < this.navBarElements.length; i++)
  	{
  		if(clicked === this.navBarElements[i])
  		{
  			route = this.routerElements[i];
  		}
  	}
  	this.router.navigate(["/" + route + ""]);
  }

  takeMeHome(event)
  {
  	this.router.navigate(['']);
  }

}
