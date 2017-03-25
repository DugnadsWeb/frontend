import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from '../../services/services';

@Component({
  selector: 'message-sender',
  templateUrl: './message-sender.component.html',
  styleUrls: ['./message-sender.component.css']
})
export class MessageSenderComponent implements OnInit {

  @Input()
  sender;
  @Input()
  receiver;

  message:string;

  constructor(private msgService: MessageService) { }

  ngOnInit() {
  }

  sendMessage(){
    //this.msgService.sendMessage(this.sender.type, this.sender.id,
    //  this.receiver.type, this.receiver.id, this.message);
    console.log(this.message);
  }


}
