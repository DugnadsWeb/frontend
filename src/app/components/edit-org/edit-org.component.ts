import { Component, OnInit, Input } from '@angular/core';
import { Organization } from '../../models/models';
import { OrgService } from '../../services/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'edit-org',
  templateUrl: './edit-org.component.html',
  styleUrls: ['./edit-org.component.css']
})
export class EditOrgComponent implements OnInit {


  org: Organization;
  orgSubscription: Subscription;

  constructor(private orgService: OrgService) { }

  ngOnInit() {
    this.orgService.getOrgObservable().then(observer => {
      this.orgSubscription = observer.subscribe(org => {
        this.org = org;
      })
    })
  }

  onSubmit(event){
    this.orgService.editOrg(this.org);
  }
}
