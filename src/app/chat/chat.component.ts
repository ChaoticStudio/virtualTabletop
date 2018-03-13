import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { Message } from '../message';
import { element } from 'protractor';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {

  @Input() messages: string;
  @Output() atSubmitSendMessage = new EventEmitter<Message>();

  constructor() { }

  ngOnInit() {
    const host = // 'localhost',
     '192.168.1.100',
      port = 3000;

    const socket = socketIo('http://' + host + ':' + port);

    socket.on('test', (data) => console.log(data));

  }

  sendMessage(message: Message) {
    this.atSubmitSendMessage.emit(message);
    const textArea = <HTMLTextAreaElement> document.getElementById('text');
    textArea.value = '';
  }
}
