import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/models';

@Component({
  selector: 'user-box',
  templateUrl: './user-box.component.html',
  styleUrls: ['./user-box.component.css']
})
export class UserBoxComponent implements OnInit {

  @Input()
  user:User;

  constructor() { }

  ngOnInit() {
  }

}
