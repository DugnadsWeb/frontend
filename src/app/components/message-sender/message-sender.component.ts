import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MessageService, AuthService } from '../../services/services';
import { Message } from '../../models/models';

@Component({
  selector: 'message-sender',
  templateUrl: './message-sender.component.html',
  styleUrls: ['./message-sender.component.css']
})
export class MessageSenderComponent implements OnInit {

  @Input()
  receiver;

  @Output()
  messageSent = new EventEmitter<any>();

  sender;

  message:string;

  constructor(private msgService: MessageService,
    private authService: AuthService) { }

  ngOnInit() {
    this.sender = {type:'user',
      id:this.authService.getDecodedToken().email};
  }

  sendMessage(){
    this.msgService.sendMessage(this.sender.type, this.sender.id,
      this.receiver.type, this.receiver.id, this.message)
      .subscribe(ret => {
        this.messageSent.emit(ret[0])
      });

  }


}
