import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrgService } from '../../services/org.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

	namelist = [];
	org_number = "";
	org_name = "";
	email = "";
	phone = "";
	description = "";

  constructor(private orgService: OrgService) {

  }


  ngOnInit() {

  	this.orgService.getOrgs().subscribe((result) => {

			var org_names = [];

  		result.forEach(function (org)
  		{
  			org_names.push(org.org_name);
  		});


  		//this.org_name = org_names;
  		this.namelist = org_names;
  		console.log(org_names);

  	});

  }
}
