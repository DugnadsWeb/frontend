import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from '../../services/auth.service';
import { DugnadService, UserService } from '../../services/services';

@Component({
  selector: 'app-info-hub',
  templateUrl: './info-hub.component.html',
  styleUrls: ['./info-hub.component.css']
})
export class InfoHubComponent implements OnInit {

  jwt_decode = require('jwt-decode');
  email = "";
  orgUUID = "";
  orgName = "";
  dugTitle = "";
  dugStartTime = "";
  dugEndTime = "";
  dugLocation = "";
  dugDescription = "";

  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router,
              private dugnadService: DugnadService) { }

  ngOnInit() {

    this.getOrganizations();

  }

  getOrganizations(){
    var token = localStorage.getItem('auth_token');
    var decoded = this.jwt_decode(token);

    this.email = decoded.email;
    this.userService.getOrganizations(this.email).subscribe((result) => {
      if(result){
        console.log(result);
        this.orgName = result[0];
        this.orgUUID = result[1];
        this.getDugnads(this.orgUUID);
      }
    },(error) => {
      if(error){
        console.log(error);
      }
    });
  }

  getDugnads(id)
  {
    this.dugnadService.getDugnadsForOrg(id).subscribe((result) => {
      if (result) {
        console.log(result);
        this.dugTitle = result.title;
        this.dugStartTime = result.startTime;
        this.dugEndTime = result.endTime;
        this.dugLocation = result.location;
        this.dugDescription = result.description;
      }
    }, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }

}
