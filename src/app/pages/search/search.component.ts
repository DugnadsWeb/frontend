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
	tmpNamelist = [];
	orglist = [];
	orgNumber = "";
	orgName = "";
	email = "";
	phone = "";
	description = "";

  constructor(private orgService: OrgService, private router: Router) {

  }
	
	
	//////////////////////////////////
	/////////////TODO/////////////////
	/////////////TODO/////////////////
	//////////////////////////////////
	/*GJØR DETTE PENERE, HÅPLØS SPAGETTI KODE*/

  ngOnInit() {

  	this.orgService.getOrgs().subscribe((result) => {

			var orgNames = [];
			var listOfOrgs = [];

  		result.forEach(function (org)
  		{
  			orgNames.push(org.orgName);
  			listOfOrgs.push(org);
  		});

			this.tmpNamelist = orgNames;
  		this.namelist = orgNames;
  		this.orglist = listOfOrgs;
  	});

  }
  
  getList()
  {
  	var orgNames = [];
  	for(var i = 0; i < this.tmpNamelist.length; i++)
  	{
			var a = this.tmpNamelist[i];
			orgNames.push(a);	
		}
		this.namelist = orgNames;
  }
  
	searchFunction(event: any, value: string)
	{
		value = value.toUpperCase();
		var tmpNameList = this.tmpNamelist;
		var tmpNames = [];
		
		for(var i = 0; i < this.namelist.length; i++){
			var a = this.namelist[i];
			
			if(event.keyCode == 8)
			{
				for(var i = 0; i < this.tmpNamelist.length; i++)
				{
					var b = tmpNameList[i];
					if(b.toUpperCase().indexOf(value) > -1)
					{
						tmpNames.push(b);	
					}
				}	
			}
			else if(a.toUpperCase().indexOf(value) > -1)
			{
				tmpNames.push(a);
			}
		}
		this.namelist = tmpNames;
		
		if(value == ""){
			this.getList();
		}
		
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
