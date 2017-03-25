import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../models/models';
import { MessageSenderComponent } from '../message-sender/message-sender.component';


@Component({
  selector: 'org-message-board',
  templateUrl: './org-message-board.component.html',
  styleUrls: ['./org-message-board.component.css']
})
export class OrgMessageBoardComponent implements OnInit {

  @Input()
  uuid:string;
  messages: Message[];

  constructor() { }

  ngOnInit() {
  }

}
