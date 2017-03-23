import { Component, OnInit, ViewContainerRef  } from '@angular/core';
import { Router } from '@angular/router';

import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

import { AuthService} from '../../services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  email = '';
  password = '';
	token = window.localStorage.getItem('auth_token');
	
  constructor(private authService: AuthService, private router: Router, public modal: Modal, overlay: Overlay, vcRef: ViewContainerRef) {
  	overlay.defaultViewContainer = vcRef;
  	}


  ngOnInit() {
  	if(this.token)
  	{
  		this.router.navigate(['profile']);	
  	}
  }

  onSubmit(event) {
      this.authService.login(this.email, this.password).subscribe((result) => {
        if (result) {
          	this.router.navigate(['profile']);
        }
    },(error) => {
    	
    	if(error){
    		this.modal.alert()
    		.title('Login Failed')
    		.body('Autentisering misslykket, sjekk at du har stavet korrekt.')
    		.open();
    	}
    });

    }



}
