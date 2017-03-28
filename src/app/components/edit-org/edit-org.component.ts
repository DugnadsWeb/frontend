import { Component, OnInit, Input } from '@angular/core';
import { Organization } from '../../models/models';
import { OrgService } from '../../services/services';

@Component({
  selector: 'edit-org',
  templateUrl: './edit-org.component.html',
  styleUrls: ['./edit-org.component.css']
})
export class EditOrgComponent implements OnInit {

  @Input()
  org: Organization;

  editOrg: Organization;

  constructor(private orgService: OrgService) { }

  ngOnInit() {
    this.editOrg = Object.assign({}, this.org);
    console.log(this.org);
    console.log(this.editOrg)
  }

  onSubmit(event){
    this.orgService.updateOrg(this.editOrg).subscribe(res => {
      console.log("am i called?");
      this.org = this.editOrg;
    });
  }

}
