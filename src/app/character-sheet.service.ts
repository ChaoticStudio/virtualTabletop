import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class CharacterSheetService {

  private _getUrl = '/api/character-sheet';
  private _postUrl = '/api/character-sheet';
  private _getUrlTemplate = '/api/character-sheet-template';
  private _postUrlTemplate = '/api/character-sheet-template';

  constructor(private _http: HttpClient) { }

  getCharacterSheet(owner) {
    return this._http.get(this._getUrl + '?owner=' + owner);
  }

  addCharacterSheet(_owner: String, _characterSheet: Object) {
    const sheetObject = {owner : _owner, sheet: _characterSheet};
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this._http.post(this._postUrl, JSON.stringify(sheetObject), {headers: headers});
  }

  getTemplate(templateID) {
    return this._http.get(this._getUrlTemplate + '?id=' + templateID);
  }

  getTemplates() {
    return this._http.get(this._getUrlTemplate + '?all=true');
  }

  addTemplate(_template: Object) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this._http.post(this._postUrlTemplate, JSON.stringify(_template), {headers: headers});
  }
}
