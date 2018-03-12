import { Component, OnInit } from '@angular/core';
import { Message } from '../message';
import { ChatService } from './../chat.service';

@Component({
  selector: 'app-tabletop-center',
  templateUrl: './tabletop-center.component.html',
  styleUrls: ['./tabletop-center.component.css'],
  providers: [ChatService]
})
export class TabletopCenterComponent implements OnInit {

  messages: Array<Message>;

  constructor(private _chatService: ChatService) { }

  ngOnInit() {
    this._chatService.getMessages().subscribe((resChatData) => this.messages = resChatData);
  }

}
