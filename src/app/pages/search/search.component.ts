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

  constructor(private orgService: OrgService, private router: Router) {

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
  
  fetchOrgs()
  {
  	this.orgService.getOrgs().subscribe((result) => {

			var org_names = [];
			var listOfOrgs = [];
			console.log(result);

  		result.forEach(function (org)
  		{
  			org_names.push(org.org_name);
  			listOfOrgs.push(org);
  		});

  		this.namelist = org_names;
  		this.orglist = listOfOrgs;
  	});
  }
  
	searchFunction(value: string)
	{
		value = value.toUpperCase();
		var org_names = [];
		
		for(var i = 0; i < this.namelist.length; i++){
			var a = this.namelist[i];
			if(a.toUpperCase().indexOf(value) > -1)
			{
				org_names.push(a);
			}
			
		}
		if(value == ""){
			this.fetchOrgs();
		}
		this.namelist = org_names;
	}
  
  routeToOrg(clicked){
  	
  	for(var i = 0; i < this.orglist.length; i++){
	  	if(this.orglist[i].org_name == clicked)
	  	{
	  		this.router.navigate(['org/', this.orglist[i].uuid]);
	  	}
  	}
  	
  }
  
  
  
}
