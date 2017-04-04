import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService} from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { Overlay } from 'angular2-modal';


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
	imgsrc = "";
	image = Blob;


  constructor(private authService: AuthService, private userService: UserService, private router: Router, public modal: Modal, overlay: Overlay, vcRef: ViewContainerRef)
   {
   	 overlay.defaultViewContainer = vcRef;
   }

  ngOnInit() {
  	this.getProfileData();
  }


	private getProfileData(){
		var token = localStorage.getItem('auth_token');
		var decoded = this.jwt_decode(token);
		this.firstName = decoded.firstName;
		this.lastName = decoded.lastName;
		this.email = decoded.email;
		this.userService.getPicture(this.email).subscribe((result) =>{
			if(result)
			{
				this.imgsrc = result[0];
			}
		},(error) => {
			if(error)
			{
				this.imgsrc = '../../../assets/img/placeholder_profile_pic.png';
			}
		});

	}
  onSubmit(event){
  		this.authService.logout();
  		this.router.navigate(['']);
  }

  onUpload(event){

  	var base64 = this.image.toString();
  	if(base64 === "function Blob() { [native code] }")
  	{
  		this.modal.alert()
  		.title('Error')
  		.body('Du har ikke valgt et bilde, velg ett og prøv igjen')
  		.open();
  	}
  	else
  	{
  		this.userService.postPicture(base64, this.email).subscribe((result) => {
  			this.imgsrc = this.image.toString();
  	});
  	}

  }

  onChange($event) : void {
  	this.readThis($event.target);
	}

	readThis(inputValue: any): void {
	  var file:File = inputValue.files[0];
	  var myReader:FileReader = new FileReader();

	  myReader.onloadend = (e) => {
	    this.image = myReader.result;
	  }
	  myReader.readAsDataURL(file);
	}

}
