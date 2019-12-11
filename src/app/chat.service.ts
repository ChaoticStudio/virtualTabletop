import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Message } from './message'

@Injectable({ providedIn: 'root' })
export class ChatService {
  private _getUrl = '/api/messages'
  private _postUrl = '/api/message'

  constructor(private _http: HttpClient) {}

  getMessages() {
    return this._http.get<Message[]>(this._getUrl)
  }

  addMessage(message: Message) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })

    return this._http.post<Message>(this._postUrl, JSON.stringify(message), {
      headers: headers
    })
  }
}
