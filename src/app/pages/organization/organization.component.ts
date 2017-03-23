import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrgService } from '../../services/org.service';


@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {


	org_number = "";
	org_name = "";
	email = "";
	phone = "";
	description = "";

  constructor(private orgService: OrgService) {

  }


  ngOnInit() {

  	this.orgService.getOrgs().subscribe((result) => {
        

  	});

  }

}
