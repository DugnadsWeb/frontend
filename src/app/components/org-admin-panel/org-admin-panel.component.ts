import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Organization } from '../../models/models';
import {OrgService} from "../../services/org.service";
import {Router} from "@angular/router";


@Component({
  selector: 'org-admin-panel',
  templateUrl: './org-admin-panel.component.html',
  styleUrls: ['./org-admin-panel.component.css']
})
export class OrgAdminPanelComponent implements OnInit {

  @Input()
  org:Organization;

  // TODO quick fix! should be done through service. make this so during service refactoring.
  @Output()
  memberAdded = new EventEmitter();

  constructor(private orgService: OrgService,
              private router: Router) { }

  ngOnInit() {
  }

  addedMember(event){
    console.log(event)
    this.memberAdded.emit(event);
  }

  deleteOrg(uuid){
    this.orgService.deleteOrgHttp(uuid).subscribe();
    this.router.navigate(['']);
  }

}
