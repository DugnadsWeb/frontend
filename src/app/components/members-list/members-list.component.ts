import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserBoxComponent } from '../user-box/user-box.component';
import { User } from '../../models/models';
import { OrgService } from '../../services/services';

@Component({
  selector: 'members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {


  // TODO remove
  @Input()
  users: User[];

  // TODO remove
  @Input()
  title:string;



  constructor(private orgService : OrgService) { }

  ngOnInit() {

  }

}
