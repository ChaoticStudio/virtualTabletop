import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ChatService {

  private _getUrl = '/api/messages';

  constructor(private _http: Http) { }

  getMessages() {
    return this._http.get(this._getUrl).map((response: Response) => response.json());
  }

}
