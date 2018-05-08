import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { Message } from './message';

@Injectable({providedIn: 'root'})
export class ChatService {

  private _getUrl = '/api/messages';
  private _postUrl = '/api/message';

  constructor(private _http: Http) { }

  getMessages() {
    return this._http.get(this._getUrl).pipe(map((response: Response) => response.json()));
  }

  addMessage(message: Message) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this._http.post(this._postUrl, JSON.stringify(message), options).pipe(map((response: Response) => response.json()));
  }

}
