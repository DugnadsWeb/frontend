import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../models/models';

@Component({
  selector: 'wall-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input()
  message:Message;

  constructor() { }

  ngOnInit() {
  }

}
