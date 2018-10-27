import { Component, OnInit, ViewChild } from '@angular/core';
import { FieldConfig } from './../field.interface';
import { CharacterSheetService } from './../character-sheet.service';
import { UserdataService } from '../userdata.service';
import { DynamicFormComponent } from '../components/dynamic-form/dynamic-form.component';


@Component({
  selector: 'app-sheet-builder',
  templateUrl: './sheet-builder.component.html',
  styleUrls: ['./sheet-builder.component.css']
})
export class SheetBuilderComponent implements OnInit {

  characterSheetObject: Object;
  characterSheetKeys: Array<String>;
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  sheetOptions: FieldConfig[] = [
    {
      type: 'select',
      label: 'System',
      name: 'system',
      options: ['Custom', 'D&D 5e', 'Call of Cthulhu 7e', 'Ars Magica 5e', '7th Sea 2e'],
      value: 'Custom'
    },
    {
      type: 'button',
      label: 'input'
    }
  ];

  fieldEditor: FieldConfig[] = [];
  sheetPreview: FieldConfig[] = [];

  constructor(private _characterSheetService: CharacterSheetService,
              private _userDataService: UserdataService) { }

  ngOnInit() {
  }

  submit(event) {
    // console.log(event);
  }

  postMessage(owner: String, characterSheet: Object) {
    this._characterSheetService.addCharacterSheet(owner, characterSheet).subscribe(resNewCharacterSheet => {
      this.characterSheetObject = resNewCharacterSheet['sheet'];
      this.characterSheetKeys = Object.keys(this.characterSheetObject);
    });
  }

  loadPreset(preset) {

  }

  saveFields() {
    this._userDataService.getUserName().subscribe(resData => {
      const owner = resData['name'];
      if (owner) {
        let object = '"name":"' + (<HTMLInputElement>document.getElementById('character-sheet-edit-owner')).value + '",';
        const fields = (<HTMLCollectionOf<Element>>document.getElementsByClassName('field-container'));
        for (let i = 0; i < fields.length; i++) {
          const label = (<HTMLInputElement>fields[i].getElementsByClassName('field-label')[0]).value;
          const value = (<HTMLInputElement>fields[i].getElementsByClassName('field-value')[0]).value;
          if (label.trim() && value.trim()) {
            object += '"' + label + '":"' + value + '"';
            if (i < fields.length - 1) {
              object += ',';
            }
          }
        }
        this.postMessage(owner, JSON.parse('{' + object + '}'));
      }
    });
  }

  addField() {
    const fieldType = (<HTMLInputElement>document.getElementById('sheet-fields-type')).value;
    const fieldsContainer = (<HTMLElement>document.getElementsByClassName('sheet-fields')[0]);

    const fieldContainer = document.createElement('DIV');
    fieldContainer.classList.add('field-container');

    const labelInput = document.createElement('INPUT');
    labelInput.classList.add('field-label');
    labelInput.setAttribute('type', 'text');
    labelInput.setAttribute('placeholder', 'Label');

    const valueInput = document.createElement('INPUT');
    valueInput.classList.add('field-value');
    valueInput.setAttribute('type', fieldType);
    valueInput.setAttribute('placeholder', 'Value');

    fieldContainer.appendChild(labelInput);
    fieldContainer.appendChild(valueInput);

    fieldsContainer.appendChild(fieldContainer);
  }


  getTemplate(templateID) {
    this._characterSheetService.getTemplate(templateID);
  }

  exportTemplate(template) {
    console.log(template);
    this._characterSheetService.addTemplate(template);
  }

  importFields() {
    const template = this.getTemplate((<HTMLInputElement>document.getElementById('template-import')).value);
    const fieldsContainer = (<HTMLElement>document.getElementsByClassName('sheet-fields')[0]);

    for (let i = 0; i < template['fields'].length; i++) {
      const field = template['fields'][i];

      const fieldContainer = document.createElement('DIV');
      fieldContainer.classList.add('field-container');

      const labelInput = document.createElement('INPUT');
      labelInput.classList.add('field-label');
      labelInput.setAttribute('type', 'text');
      labelInput.setAttribute('placeholder', 'Label');
      labelInput.setAttribute('value', field['name']);
      labelInput.setAttribute('disabled', 'disabled');

      const valueInput = document.createElement('INPUT');
      valueInput.classList.add('field-value');
      valueInput.setAttribute('type', field['type']);
      valueInput.setAttribute('placeholder', 'Value');

      fieldContainer.appendChild(labelInput);
      fieldContainer.appendChild(valueInput);

      fieldsContainer.appendChild(fieldContainer);
    }
  }

  validateForm(fields) {
    for (let i = 0; i < fields.length; i++) {
      const x = fields[i].checkValidity();
      if (!x) {
        return false;
      }
    }
    return true;
  }

  exportFields() {
    this._userDataService.getUserName().subscribe(resData => {
      const id = resData['_id'];
      if (id) {
        const fieldsArray = [];
        const fields = (<HTMLCollectionOf<Element>>document.getElementsByClassName('field-container'));
        if (this.validateForm(fields[0].getElementsByClassName('field-label'))) {
          for (let i = 0; i < fields.length; i++) {
            const object = {};
            const label = (<HTMLInputElement>fields[i].getElementsByClassName('field-label')[0]).value;
            const type = (<HTMLInputElement>fields[i].getElementsByClassName('field-value')[0]).getAttribute('type');
            if (label.trim() && type.trim()) {
              object['name'] = label;
              object['type'] = type;
              fieldsArray.push(object);
            }
          }
          const template = {
            'id': id,
            'fields': fieldsArray
          };
          this.exportTemplate(JSON.stringify(template));
        }
      }
    });
  }

}
