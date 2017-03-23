import { Component, OnInit, Input } from '@angular/core';
import { Organization } from '../../models/models';

@Component({
  selector: 'org-info',
  templateUrl: './org-info.component.html',
  styleUrls: ['./org-info.component.css']
})
export class OrgInfoComponent implements OnInit {

  @Input()
  org: Organization;

  constructor() { }

  ngOnInit() {
    console.log(this.org.orgName);
  }

}
