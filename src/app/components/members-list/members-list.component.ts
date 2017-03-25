import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserBoxComponent } from '../user-box/user-box.component';
import { User } from '../../models/models';

@Component({
  selector: 'members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {

  @Input()
  users: User[];

  @Input()
  title:string;

  constructor() { }

  ngOnInit() {
  }

}
