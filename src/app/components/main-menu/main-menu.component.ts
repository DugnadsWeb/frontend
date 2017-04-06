import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from '../../services/auth.service';

@Component({
  selector: 'main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

	navBarElements = [];
  routerElements = [];

	dropdownElements = [];
	dropdownRoutes = [];

	atagsrc = "";


  constructor(private authService: AuthService, private router: Router)
  {

    this.dropdownElements = ["Min Side"];
  	this.dropdownRoutes = ["profile"];

	  if(this.authService.status){
		  this.atagsrc ="Logg ut";
      this.routerElements = ["profile", "register-org", "search", "info-hub"];
      this.navBarElements = ["Profil","Registrer Org", "Organisasjoner", "Oversikt"];
	  }
	  else{
		  this.atagsrc ="Logg inn";
      this.navBarElements = ["Login", "Registrer Bruker"];
      this.routerElements = ["login", "register"];
	  }
  }

  ngOnInit() {
    this.makeNavBar();
  }

  makeNavBar()
  {
    this.authService.status.subscribe(status => {
      if(status == true) {
        this.atagsrc = "Logg ut";
        this.routerElements = ["profile", "register-org", "search", "info-hub"];
        this.navBarElements = ["Profil", "Registrer Org", "Organisasjoner", "Oversikt"];
      }
      else{
        this.atagsrc = "Logg inn";
        this.navBarElements = ["Login", "Registrer Bruker"];
        this.routerElements = ["login", "register"];
      }

    });
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
