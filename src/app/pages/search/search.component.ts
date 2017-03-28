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
	orgNumber = "";
	orgName = "";
	email = "";
	phone = "";
	description = "";

  constructor(private orgService: OrgService, private router: Router) {

  }


  ngOnInit() {

  	this.orgService.getOrgs().subscribe((result) => {

			var orgNames = [];
			var listOfOrgs = [];

  		result.forEach(function (org)
  		{
  			orgNames.push(org.orgName);
  			listOfOrgs.push(org);
  		});

  		this.namelist = orgNames;
  		this.orglist = listOfOrgs;
  	});

  }
  
  fetchOrgs()
  {
  	this.orgService.getOrgs().subscribe((result) => {

			var orgNames = [];
			var listOfOrgs = [];
			console.log(result);

  		result.forEach(function (org)
  		{
  			orgNames.push(org.orgName);
  			listOfOrgs.push(org);
  		});

  		this.namelist = orgNames;
  		this.orglist = listOfOrgs;
  	});
  }
  
	searchFunction(value: string)
	{
		value = value.toUpperCase();
		var orgNames = [];
		
		for(var i = 0; i < this.namelist.length; i++){
			var a = this.namelist[i];
			if(a.toUpperCase().indexOf(value) > -1)
			{
				orgNames.push(a);
			}
			
		}
		if(value == ""){
			this.fetchOrgs();
		}
		this.namelist = orgNames;
	}
  
  routeToOrg(clicked){
  	
  	for(var i = 0; i < this.orglist.length; i++){
	  	if(this.orglist[i].orgName == clicked)
	  	{
	  		console.log(this.orglist[i].uuid);
	  		this.router.navigate(['org/', this.orglist[i].uuid]);
	  	}
  	}
  	
  }
  
  
  
}
