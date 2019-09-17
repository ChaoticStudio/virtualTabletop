import { Component, OnInit, ViewChildren, ViewChild } from '@angular/core';
import { FieldConfig } from './../field.interface';
import { CharacterSheetService } from './../character-sheet.service';
import { UserdataService } from '../userdata.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { DynamicFormComponent } from '../components/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-sheet-builder',
  templateUrl: './sheet-builder.component.html',
  styleUrls: ['./sheet-builder.component.scss']
})
export class SheetBuilderComponent implements OnInit {

  form: FormGroup;
  formControl = new FormControl();
  systems: string[] = ['None', 'D&D 5e', 'Call of Cthulhu 7e', 'Ars Magica 5e', '7th Sea 2e'];
  options: string[] = ['Class', 'Race', 'Three'];
  filteredOptions: Observable<string[]>;
  hasNumber = true;

  selectedComponent: FieldConfig;
  dictionaries = {
    'Class': ['Fighter', 'Wizard', 'Rogue'],
    'Race': ['Human', 'Dwarf', 'Elf']
  };

  @ViewChild(DynamicFormComponent) previewForm: DynamicFormComponent;
  sheetPreview: FieldConfig[] = [{ "type": "list", "value": [{ "name": "Character", "content": [{ "type": "listitem", "value": [{ "type": "input", "className": "lg", "inputType": "text", "name": "Name", "label": "Name" }] }, { "type": "listitem", "value": [{ "type": "select", "className": "sm", "name": "Class", "label": "Class", "options": ["Fighter", "Wizard", "Rogue"] }] }, { "type": "listitem", "value": [{ "type": "select", "className": "sm", "name": "Background", "label": "Background" }] }, { "type": "listitem", "value": [{ "type": "select", "className": "sm", "name": "Race", "label": "Race", "options": ["Human", "Dwarf", "Elf"] }] }, { "type": "listitem", "value": [{ "type": "input", "className": "sm", "inputType": "text", "name": "Alignment", "label": "Alignment" }] }, { "type": "listitem", "value": [{ "type": "input", "className": "sm", "inputType": "number", "name": "Experience Points", "label": "Experience Points" }] }] }] }, { "type": "list", "value": [{ "name": "Stats", "content": [{ "type": "listitem", "value": [{ "type": "input", "className": "tn", "inputType": "number", "name": "STR", "label": "STR" }] }, { "type": "listitem", "value": [{ "type": "input", "className": "tn", "inputType": "number", "name": "DEX", "label": "DEX" }] }, { "type": "listitem", "value": [{ "type": "input", "className": "tn", "inputType": "number", "name": "CON", "label": "CON" }] }, { "type": "listitem", "value": [{ "type": "input", "className": "tn", "inputType": "number", "name": "INT", "label": "INT" }] }, { "type": "listitem", "value": [{ "type": "input", "className": "tn", "inputType": "number", "name": "WIS", "label": "WIS" }] }, { "type": "listitem", "value": [{ "type": "input", "className": "tn", "inputType": "number", "name": "CHA", "label": "CHA" }] }] }] }, { "type": "list", "value": [{ "name": "Saving Throws", "content": [{ "type": "listitem", "value": [{ "type": "skill", "className": "sm", "inputType": "number", "name": "Strength", "label": "Strength" }] }, { "type": "listitem", "value": [{ "type": "skill", "className": "sm", "inputType": "number", "name": "Dexterity", "label": "Dexterity" }] }, { "type": "listitem", "value": [{ "type": "skill", "className": "sm", "inputType": "number", "name": "Constitution", "label": "Constitution" }] }, { "type": "listitem", "value": [{ "type": "skill", "className": "sm", "inputType": "number", "name": "Intelligence", "label": "Intelligence" }] }, { "type": "listitem", "value": [{ "type": "skill", "className": "sm", "inputType": "number", "name": "Wisdom", "label": "Wisdom" }] }, { "type": "listitem", "value": [{ "type": "skill", "className": "sm", "inputType": "number", "name": "Charisma", "label": "Charisma" }] }] }] }, { "type": "list", "value": [{ "name": "Skills", "content": [{ "type": "listitem", "value": [{ "type": "skill", "className": "sm", "inputType": "number", "name": "Acrobatics", "label": "Acrobatics" }] }, { "type": "listitem", "value": [{ "type": "skill", "className": "sm", "inputType": "number", "name": "Animal Handling", "label": "Animal Handling" }] }, { "type": "listitem", "value": [{ "type": "skill", "className": "sm", "inputType": "number", "name": "Arcana", "label": "Arcana" }] }, { "type": "listitem", "value": [{ "type": "skill", "className": "sm", "inputType": "number", "name": "Athletics", "label": "Athletics" }] }, { "type": "listitem", "value": [{ "type": "skill", "className": "sm", "inputType": "number", "name": "Deception", "label": "Deception" }] }, { "type": "listitem", "value": [{ "type": "skill", "className": "sm", "inputType": "number", "name": "History", "label": "History" }] }, { "type": "listitem", "value": [{ "type": "skill", "className": "sm", "inputType": "number", "name": "Insight", "label": "Insight" }] }, { "type": "listitem", "value": [{ "type": "skill", "className": "sm", "inputType": "number", "name": "Intimidation", "label": "Intimidation" }] }, { "type": "listitem", "value": [{ "type": "skill", "className": "sm", "inputType": "number", "name": "Investigation", "label": "Investigation" }] }, { "type": "listitem", "value": [{ "type": "skill", "className": "sm", "inputType": "number", "name": "Medicine", "label": "Medicine" }] }, { "type": "listitem", "value": [{ "type": "skill", "className": "sm", "inputType": "number", "name": "Nature", "label": "Nature" }] }, { "type": "listitem", "value": [{ "type": "skill", "className": "sm", "inputType": "number", "name": "Perception", "label": "Perception" }] }, { "type": "listitem", "value": [{ "type": "skill", "className": "sm", "inputType": "number", "name": "Performance", "label": "Performance" }] }, { "type": "listitem", "value": [{ "type": "skill", "className": "sm", "inputType": "number", "name": "Persuasion", "label": "Persuasion" }] }, { "type": "listitem", "value": [{ "type": "skill", "className": "sm", "inputType": "number", "name": "Religion", "label": "Religion" }] }, { "type": "listitem", "value": [{ "type": "skill", "className": "sm", "inputType": "number", "name": "Sleight of Hand", "label": "Sleight of Hand" }] }, { "type": "listitem", "value": [{ "type": "skill", "className": "sm", "inputType": "number", "name": "Stealth", "label": "Stealth" }] }, { "type": "listitem", "value": [{ "type": "skill", "className": "sm", "inputType": "number", "name": "Survival", "label": "Survival" }] }] }] }, { "type": "list", "value": [{ "name": "Combat", "content": [{ "type": "listitem", "value": [{ "type": "input", "className": "sm", "inputType": "number", "name": "Armor Class", "label": "Armor Class" }] }, { "type": "listitem", "value": [{ "type": "input", "className": "sm", "inputType": "number", "name": "Initiative", "label": "Initiative" }] }, { "type": "listitem", "value": [{ "type": "input", "className": "sm", "inputType": "number", "name": "Speed", "label": "Speed" }] }, { "type": "listitem", "value": [{ "type": "input", "className": "sm", "inputType": "number", "name": "Hit Point Maximum", "label": "Hit Point Maximum" }] }, { "type": "listitem", "value": [{ "type": "input", "className": "sm", "inputType": "number", "name": "Current Hit Point", "label": "Current Hit Point" }] }, { "type": "listitem", "value": [{ "type": "input", "className": "sm", "inputType": "number", "name": "Temporary Hit Point", "label": "Temporary Hit Point" }] }, { "type": "listitem", "value": [{ "type": "input", "className": "sm", "inputType": "text", "name": "Hit Dice", "label": "Hit Dice" }] }, { "type": "listitem", "value": [{ "type": "checkbox", "name": "Success", "value": "3" }] }, { "type": "listitem", "value": [{ "type": "checkbox", "name": "Failures", "value": "3" }] }, { "type": "listitem", "value": [{ "type": "textarea", "name": "Items", "label": "Items" }] }] }] }];

  constructor(private _characterSheetService: CharacterSheetService,
              private _userDataService: UserdataService,
              private _fb: FormBuilder) {
                this.form = _fb.group({
                  system: 'Custom',
                  hasBorder: true,
                  direction: 'Horizontal',
                  label: '',
                  inputType: 'text',
                  hasNumber: true,
                  dictionary: '',
                  isMultipleSelection: false
                });
              }

  ngOnInit() {
    this.filteredOptions = this.formControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  submit(event) {}

  addProperty(property: string) {
    const label = this.form.value.label;
    switch (property) {
      case 'Container':
        this.selectedComponent = {type: 'list', value: [{name: label, content: []}]};
        this.sheetPreview.push(this.selectedComponent);
        break;
      case 'Input':
        this.selectedComponent.value[0].content.push(
          {
            type: 'listitem',
            value: [
              {
                type: 'input',
                inputType: this.form.value.inputType,
                name: label,
                label: label
              }
            ]
          }
        );
        break;
      /*case 'Textarea':
        this.selectedComponent.value[0].content.push(
          {
            type: 'listitem',
            value: [
              {
                type: 'textarea',
                name: label,
                label: label
              }
            ]
          }
        );
        break;*/
      case 'Select':
        this.selectedComponent.value[0].content.push(
          {
            type: 'listitem',
            value: [
              {
                type: 'select',
                name: label,
                label: label,
                options: this.dictionaries[this.form.value.dictionary]
              }
            ]
          }
        );
       break;
      case 'Checkbox':
        const checkboxValue: FieldConfig[] = [];
        if (this.form.value.hasNumber) {
          checkboxValue.push({
            type: 'skill',
            inputType: 'number',
            name: label,
            label: label
          });
        } else {
          checkboxValue.push({
            type: 'checkbox',
            name: label,
          });
        }
        this.selectedComponent.value[0].content.push(
          {
            type: 'listitem',
            value: checkboxValue
          }
        );
        break;
    }
  }

  saveTemplate() {
    const a = document.createElement("a");
    const obj = JSON.stringify([].concat(...this.sheetPreview));
    const file = new Blob([obj], {type: 'text/plain'});
    a.href = URL.createObjectURL(file);
    a.download = 'template';
    a.click();
  }

  changeTemplate(template: string) {
    switch (template) {
      case this.systems[0]: // None
        this.sheetPreview = [];
        break;
      case this.systems[1]: // 5e
        // tslint:disable-next-line:max-line-length
        this.sheetPreview = [];
        break;
    }
  }

}
