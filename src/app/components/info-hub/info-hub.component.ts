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

/**/

export class InfoHubComponent implements OnInit {

  jwt_decode = require('jwt-decode');
  email = "";
  orgUUID = "";


  org: { orgName: string; uuid: string;};

  dugnader : Dugnad[];
  orgs: OrgDug[];


  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router,
              private dugnadService: DugnadService) { }

  ngOnInit() {

    this.getOrganizations();

  }

  getOrganizations(){
    let token = localStorage.getItem('auth_token');
    let decoded = this.jwt_decode(token);
    let orgs = [];
    let uuids = [];

    this.email = decoded.email;
    this.userService.getOrganizations(this.email).subscribe((result) => {
      if(result){

        for(let i=0; i < result.length; i += 2){
              orgs.push(new OrgDug(result[i],result[i+1]));
        }

        this.orgs = orgs;

        for(let i=0; i < orgs.length; i++) {
          uuids.push(orgs[i].uuid);
        }

        this.getDugnads.apply(this, uuids);
      }
    },(error) => {
      if(error){
        console.log(error);
      }
    });
  }

  getDugnads(...uuidList: any[])
  {

    console.log(uuidList);
    let dugnadsList = [];

    for(let i = 0; i < uuidList.length; i++){
      this.dugnadService.getDugnadsForOrg(uuidList[i]).subscribe((result) => {
        if(result){
          result.forEach(function (dug){
            dugnadsList.push(dug);
          });
        }

        }, (error) => {
          if (error) {
            console.log(error);
          }
        });
    }
    this.dugnader = dugnadsList;
  }

}
class OrgDug {
  orgName: string;
  uuid: string;

  constructor(orgName:string, uuid:string){
    this.orgName = orgName;
    this.uuid = uuid;
  }
}
