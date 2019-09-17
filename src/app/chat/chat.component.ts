import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import * as socketIo from 'socket.io-client';
import { ChatService } from './../chat.service';
import { Message } from '../message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [ChatService]
})
export class ChatComponent implements OnInit {

  messagesFromDB: Array<Message>;

  constructor(private _chatService: ChatService) { }

  postMessage(message: Message) {
    this._chatService.addMessage(message).subscribe((resNewMessage) => {
      this.messagesFromDB.push(resNewMessage);
    });
  }

  ngOnInit() {
    this._chatService.getMessages().subscribe((resChatData) => this.messagesFromDB = resChatData);
    const host = 'localhost',
      port     = 3500,
      socket   = socketIo('http://' + host + ':' + port),
      status   = <HTMLDivElement>document.getElementById('status'),
      messages = <HTMLDivElement>document.getElementById('messages'),
      textarea = <HTMLTextAreaElement>document.getElementById('textarea'),
      username = <HTMLInputElement>document.getElementById('username'),
      clearBtn = <HTMLButtonElement>document.getElementById('clear');

    // Set default status
    const statusDefault = status.textContent;

    const setStatus = (s) => {
      // Set status
      status.textContent = s;
      if (s !== statusDefault) {
        const delay = setTimeout(() => {
            setStatus(statusDefault);
        }, 4000);
      }
    };

    // Check for connection
    if (socket !== undefined) {
      console.log('Connected to socket...');
      // Handle Output
      socket.on('output', (data) => {
        if (data.length) {
          for ( let x = 0; x < data.length; x++) {
            // Build out message div
            const message = document.createElement('div');
            const name = document.createElement('span');
            name.setAttribute('id', 'text-bold');
            name.textContent = data[x].name;
            name.style.setProperty('font-weight', 'bolder');
            message.setAttribute('class', 'chatMessage');
            message.appendChild(name);
            message.appendChild(document.createTextNode(': ' + data[x].message));
            messages.appendChild(message);
            messages.insertBefore(message, messages.firstChild);
          }
        }
      });

      // Get chats from mongo collection
      // socket.emit('output', this.messagesFromDB);

      // Get Status From Server
      socket.on('status', (data) => {
        // get message status
        setStatus((typeof data === 'object') ? data.message : data);
        // If status is clear, clear text
        if (data.clear) {
          textarea.value = '';
        }
      });

      // Handle Input
      textarea.addEventListener('keydown', (event) => {
        if (event.which === 13 && event.shiftKey === false) {
          // Emit to server input
          const newMessage = new Message();
          newMessage.name = username.value;
          newMessage.message = textarea.value;
          socket.emit('input', newMessage);
          this.postMessage(newMessage);
          event.preventDefault();
        }
      });
      // Handle Chat Clear
      clearBtn.addEventListener('click', () => {
          socket.emit('clear');
      });
      // Clear Message
      socket.on('cleared', () => {
        messages.textContent = '';
      });
    }
  }


}
