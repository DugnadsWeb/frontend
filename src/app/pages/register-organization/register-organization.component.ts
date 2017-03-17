import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrgService } from '../services/org.service';

@Component({
  selector: 'app-register-organization',
  templateUrl: './register-organization.component.html',
  styleUrls: ['./register-organization.component.css']
})
export class RegisterOrganizationComponent implements OnInit {

	org_number = ""; 
	org_name = "";
	email = "";
	phone = "";
	description = "";

  constructor(private orgService : OrgService, private router : Router) { }

  ngOnInit() {
  }

	onSubmit(event)
	{
		this.orgService.registerorg(this.org_number, this.org_name, this.email, this.phone, this.description).subscribe((result)	=> {
			if(result)
			{
				this.router.navigate(['']);
			}
		});		
	}
}
