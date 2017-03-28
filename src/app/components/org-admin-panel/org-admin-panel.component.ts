import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Organization } from '../../models/models';


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

  constructor() { }

  ngOnInit() {
  }

  addedMember(event){
    console.log(event)
    this.memberAdded.emit(event);
  }

}
