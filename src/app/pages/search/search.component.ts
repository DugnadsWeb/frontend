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
	orglist = [];
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
			var listOfOrgs = [];

  		result.forEach(function (org)
  		{
  			org_names.push(org.org_name);
  			listOfOrgs.push(org);
  		});

  		this.namelist = org_names;
  		this.orglist = listOfOrgs;
  	});

  }
  
  showMore(clicked){
  	
  	
  	
  	for(var i = 0; i < this.orglist.length; i++)
  	{
  		if(this.orglist[i].org_name == clicked)
  		{
  			this.org_number = this.orglist[i].org_number;	
  			this.email = this.orglist[i].email;
  			this.phone = this.orglist[i].phone;
  			this.description = this.orglist[i].org_description;
  		}
  	}
  	this.org_name = clicked;
  	
  }
}
