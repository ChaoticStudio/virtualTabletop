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
    console.log(this._characterSheetService.getTemplates());
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
      for (let i = 0; i < fields.length; i++) {
        let label = (<HTMLInputElement>fields[i].getElementsByClassName('field-label')[0]).value;
        let value = (<HTMLInputElement>fields[i].getElementsByClassName('field-value')[0]).value;
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
    let fieldType = (<HTMLInputElement>document.getElementById('sheet-fields-type')).value;
    let fieldsContainer = (<HTMLElement>document.getElementsByClassName('sheet-fields')[0]);

    let fieldContainer = document.createElement('DIV');
    fieldContainer.classList.add('field-container');

    let labelinput = document.createElement('INPUT');
    labelinput.classList.add('field-label');
    labelinput.setAttribute('type', 'text');
    labelinput.setAttribute('placeholder', 'Label');

    let valueinput = document.createElement('INPUT');
    valueinput.classList.add('field-value');
    valueinput.setAttribute('type', fieldType);
    valueinput.setAttribute('placeholder', 'Value');

    fieldContainer.appendChild(labelinput);
    fieldContainer.appendChild(valueinput);

    fieldsContainer.appendChild(fieldContainer);
  }

  getTemplate(templateID) {
    this._characterSheetService.getTemplate(templateID);
  }

  exportTemplate(template) {
    this._characterSheetService.addTemplate(template);
  }

  importFields() {
    let template = this.getTemplate((<HTMLInputElement>document.getElementById('template-import')).value);
    let fieldsContainer = (<HTMLElement>document.getElementsByClassName('sheet-fields')[0]);

    for (var i = 0; i < template["fields"].length; i++) {
      let field = template["fields"][i];

      let fieldContainer = document.createElement('DIV');
      fieldContainer.classList.add('field-container');

      let labelinput = document.createElement('INPUT');
      labelinput.classList.add('field-label');
      labelinput.setAttribute('type', 'text');
      labelinput.setAttribute('placeholder', 'Label');
      labelinput.setAttribute('value', field["name"]);
      labelinput.setAttribute('disabled', 'disabled');

      let valueinput = document.createElement('INPUT');
      valueinput.classList.add('field-value');
      valueinput.setAttribute('type', field["type"]);
      valueinput.setAttribute('placeholder', 'Value');

      fieldContainer.appendChild(labelinput);
      fieldContainer.appendChild(valueinput);

      fieldsContainer.appendChild(fieldContainer);
    };
  }

  validateForm(fields) {
    for (var i = 0; i < fields.length; i++) {
      var x = fields[i].checkValidity();
      if (!x) {
        return false;
      }
    }
    return true;
  }

  exportFields() {
    let id = (<HTMLInputElement>document.getElementById('character-sheet-edit-owner')).value;
    if (id) {
      let fieldsArray = [];
      let fields = (<HTMLCollectionOf<Element>>document.getElementsByClassName('field-container'));
      if (this.validateForm(fields[0].getElementsByClassName('field-label'))) {
        console.log('entered');
        for (let i = 0; i < fields.length; i++) {
          var object = {};
          let label = (<HTMLInputElement>fields[i].getElementsByClassName('field-label')[0]).value;
          let type = (<HTMLInputElement>fields[i].getElementsByClassName('field-value')[0]).getAttribute("type");
          if (label.trim() && type.trim()) {
            object["name"] = label;
            object["type"] = type;
            fieldsArray.push(object);
          }
        }
        let template = {
          "id": id,
          "fields": fieldsArray
        }
        this.exportTemplate(JSON.stringify(template));
      }
    }
  }


}
