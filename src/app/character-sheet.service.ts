import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class CharacterSheetService {

  private _getUrl = '/api/character-sheet';
  private _postUrl = '/api/character-sheet';

  constructor(private _http: Http) { }

  getCharacterSheet(name) {
    return this._http.get(this._getUrl+'?name='+name).map((response: Response) => response.json());
  }

  addCharacterSheet(_owner: String, _characterSheet: Object) {
    const sheetObject = {owner : _owner, sheet: _characterSheet};
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this._http.post(this._postUrl, JSON.stringify(sheetObject), options).map((response: Response) => response.json());
  }

}