import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Message } from '../../models/models';
import { MessageSenderComponent } from '../message-sender/message-sender.component';
import { MessageService } from '../../services/services';


@Component({
  selector: 'org-message-board',
  templateUrl: './org-message-board.component.html',
  styleUrls: ['./org-message-board.component.css']
})
export class OrgMessageBoardComponent implements OnInit {

  @Input()
  uuid:string;

  @Input()
  type:string;

  messages: Message[];
  receiver;



  constructor(private msgService:MessageService) { }

  ngOnInit() {
    this.receiver = {type:this.type, id:this.uuid}
    this.msgService.getMyMessages(this.type, this.uuid)
    .subscribe(ret => {
      this.messages = ret;
    })
  }

  updateMessages(message){
    if (this.messages.length > 0){
      this.messages.unshift(message);
    } else {
      this.messages.push(message);
    }
  }


}
