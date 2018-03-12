import { Component, OnInit, Input } from '@angular/core';
// import * as socketIo from 'socket.io-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {

  @Input() messages: string;

  constructor() { }

  ngOnInit() {
  /*  const host = 'localhost', // '192.168.1.102',
      port = 3000;

    const socket = socketIo('http://' + host + ':' + port);

    socket.on('test', (data) => console.log(data));
  */
  }

}
