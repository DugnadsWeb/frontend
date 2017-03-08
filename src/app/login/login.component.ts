import { Component, OnInit, ViewContainerRef  } from '@angular/core';
import { Router } from '@angular/router';

import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

import { AuthService} from '../services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router, public modal: Modal, overlay: Overlay, vcRef: ViewContainerRef) {
  	overlay.defaultViewContainer = vcRef;
  	}


  ngOnInit() {
  }

	/*
	*TODO: Fix modal, problems:
	* Does not trigger on first login failed. Only on 2,3,4,5 etc..
	* When entering right creds after a failed attempt the modal will open and then close when being redirected to profile-component
	*/
  onSubmit(event) {
      this.authService.login(this.email, this.password).subscribe((result) => {
        if (result) {
          this.router.navigate(['profile']);
        }
      });
      if(!this.authService.isLoggedIn()){
      	this.modal.alert()
      		.title('Login Failed')
      		.body('Autentisering misslykket, sjekk at du har stavet korrekt.')
      		.open();
      }
 
    }
}
