import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'org-admin-panel',
  templateUrl: './org-admin-panel.component.html',
  styleUrls: ['./org-admin-panel.component.css']
})
export class OrgAdminPanelComponent implements OnInit {

  @Input()
  uuid:string;

  constructor() { }

  ngOnInit() {
  }

}
