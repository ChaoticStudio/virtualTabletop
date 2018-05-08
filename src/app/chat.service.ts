import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { Message } from './message';
import { promise } from 'protractor';

@Injectable({providedIn: 'root'})
export class ChatService {

  private _getUrl = '/api/messages';
  private _postUrl = '/api/message';

  constructor(private _http: HttpClient) { }

  getMessages() {
    return this._http.get(this._getUrl).pipe(map((response: Response) => response.json()));
  }

  addMessage(message: Message) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const options = {headers};

    return this._http.post(this._postUrl, JSON.stringify(message), options).pipe(map((response: Response) => response.json()));
  }

}
