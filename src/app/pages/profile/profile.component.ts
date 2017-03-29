import { Component, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService} from '../../services/auth.service';
import { UserService } from '../../services/user.service';
 

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
  
  
 /* onChange(event){
  	this.image = event.srcElement.files;
  	//console.log(this.image);
  }*/
  
  onUpload(event){

  	this.imgsrc = this.image.toString();
  	var base64 = this.image.toString();
  	this.userService.postPicture(base64, this.email).subscribe((result) => {
  		if(result)
  			console.log("YAAAY");
  	});
  	
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
