import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class CharacterSheetService {

  private _getUrl = '/api/character-sheet';
  private _postUrl = '/api/character-sheet';

  constructor(private _http: HttpClient) { }

  getCharacterSheet(owner) {
    return this._http.get(this._getUrl + '?owner=' + owner);
  }

  addCharacterSheet(_owner: String, _characterSheet: Object) {
    const sheetObject = {owner : _owner, sheet: _characterSheet};
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this._http.post(this._postUrl, JSON.stringify(sheetObject), {headers: headers});
  }

}
