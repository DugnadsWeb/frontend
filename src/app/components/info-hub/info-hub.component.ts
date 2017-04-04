import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from '../../services/auth.service';
import { DugnadService, UserService } from '../../services/services';
import {Dugnad} from "../../models/dugnad";
import {forEach} from "@angular/router/src/utils/collection";
import {Organization} from "../../models/organization";

@Component({
  selector: 'app-info-hub',
  templateUrl: './info-hub.component.html',
  styleUrls: ['./info-hub.component.css']
})
export class InfoHubComponent implements OnInit {

  jwt_decode = require('jwt-decode');
  email = "";
  orgUUID = "";

  dugnader : Dugnad[];

  orgs: string[];
  uuids: string[];


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
    let orgs = [];
    let uuids = [];

    this.email = decoded.email;
    this.userService.getOrganizations(this.email).subscribe((result) => {
      if(result){

        console.log(result);
        for(let i=0; i<result.length;i++){
          if(i%2==0){
            orgs.push(result[i]);
          }else{
            uuids.push(result[i]);
          }
        }

        this.orgs = orgs;
        this.uuids = uuids;

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

        let dugnadsList = [];

        result.forEach(function (dug){
          dugnadsList.push(dug);
        });

        this.dugnader = dugnadsList;
        console.log(this.dugnader);
      }
    }, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }

}
