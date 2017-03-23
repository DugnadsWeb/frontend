import { Component, OnInit } from '@angular/core';
import { OrgService } from '../../services/org.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Organization } from '../../models/models';
import { OrgInfoComponent } from '../../components/org-info/org-info.component';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {


  org: Organization;

  constructor(private orgService: OrgService,
              private route: ActivatedRoute,
              private router: Router) {

  }


  ngOnInit() {
    this.route.params
    .switchMap((params: Params) => this.orgService.getOrg(params['id']))
    .subscribe((org: Organization) => this.org = org);

  }

}
