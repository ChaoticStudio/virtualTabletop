import { Component, OnInit } from '@angular/core';
import { CharacterSheetService } from './../character-sheet.service';
import * as socketIo from 'socket.io-client';


@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.css']
})
export class CharacterSheetComponent implements OnInit {

  characterSheetObject: Object;
  characterSheetKeys: Array<String>;

  constructor(private _characterSheetService: CharacterSheetService) { }

  postMessage(owner: String, characterSheet: Object) {
    this._characterSheetService.addCharacterSheet(owner, characterSheet).subscribe(resNewCharacterSheet => {
      console.log(resNewCharacterSheet);
      this.characterSheetObject = resNewCharacterSheet['sheet'];
      this.characterSheetKeys = Object.keys(this.characterSheetObject);
    });
  }

  ngOnInit() {
  }

  loadFields(data) {
    this.characterSheetObject = data['sheet'];
    this.characterSheetKeys = Object.keys(this.characterSheetObject);
  }

  saveFields() {
    let owner = (<HTMLInputElement>document.getElementById('character-sheet-edit-owner')).value;
    if (owner) {
      let object = '';
      let fields = (<HTMLCollectionOf<Element>>document.getElementsByClassName('field-container'));
      for ( let i = 0; i < fields.length; i++) {
        let label = (<HTMLInputElement> fields[i].getElementsByClassName('field-label')[0]).value;
        let value = (<HTMLInputElement> fields[i].getElementsByClassName('field-value')[0]).value;
        if (label.trim() && value.trim()) {
          object += '"' + label + '":"' + value + '"';
          if (i < fields.length - 1) {
            object += ',';
          }
        }
      }
      this.postMessage(owner, JSON.parse('{' + object + '}'));
    }

  }

  loadUser() {
    let owner = (<HTMLInputElement>document.getElementById('character-sheet-owner')).value;
    this._characterSheetService.getCharacterSheet(owner).subscribe((resData) => this.loadFields(resData));
  }

  addField() {
    let fieldsContainer = (<HTMLElement>document.getElementsByClassName('sheet-fields')[0]);

    let fieldContainer = document.createElement('DIV');
    fieldContainer.classList.add('field-container');

    let labelinput = document.createElement('INPUT');
    labelinput.classList.add('field-label');
    labelinput.setAttribute('type', 'text');
    labelinput.setAttribute('placeholder', 'Label');

    let valueinput = document.createElement('INPUT');
    valueinput.classList.add('field-value');
    valueinput.setAttribute('type', 'text');
    valueinput.setAttribute('placeholder', 'Value');

    fieldContainer.appendChild(labelinput);
    fieldContainer.appendChild(valueinput);

    fieldsContainer.appendChild(fieldContainer);
  }

}
