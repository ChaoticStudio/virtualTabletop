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
  styleUrls: ['./sheet-builder.component.css']
})
export class SheetBuilderComponent implements OnInit {

  form: FormGroup;
  formControl = new FormControl();
  systems: string[] = ['Custom', 'D&D 5e', 'Call of Cthulhu 7e', 'Ars Magica 5e', '7th Sea 2e'];
  options: string[] = ['Class', 'Race', 'Three'];
  filteredOptions: Observable<string[]>;
  hasNumber = true;

  selectedComponent: FieldConfig;
  dictionaries = {
    'Class': ['Fighter', 'Wizard', 'Rogue'],
    'Race': ['Human', 'Dwarf', 'Elf']
  };

  @ViewChild(DynamicFormComponent) previewForm: DynamicFormComponent;
  sheetPreview: FieldConfig[] = [];

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
      case 'Textarea':
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
        break;
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
        const checkboxValue: FieldConfig[] = [
          {
            type: 'checkbox',
            name: label,
            label: label,
          }
        ];
        if (this.form.value.hasNumber) {
          checkboxValue.push({
            type: 'input',
            inputType: 'number',
            name: label,
            label: label
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

  changeTemplate(template: string) {
    if (template === 'D&D 5e') {
    // tslint:disable-next-line:max-line-length
      this.sheetPreview = [{'type': 'list', 'value': [{'name': 'Character', 'content': [{'type': 'listitem', 'value': [{'type': 'input', 'name': 'Name', 'label': 'Name', 'value': 'Xuxulu'}]}, {'type': 'listitem', 'value': [{'type': 'input', 'name': 'Class', 'label': 'Class', 'value': 'A lot'}]}, {'type': 'listitem', 'value': [{'type': 'input', 'name': 'Level', 'label': 'Level', 'value': 'Over 9K'}]}, {'type': 'listitem', 'value': [{'type': 'input', 'name': 'Race', 'label': 'Race', 'value': 'Some times'}]}, {'type': 'listitem', 'value': [{'type': 'input', 'name': 'Alignment', 'label': 'Alignment', 'value': 'Cosmic Evil'}]}, {'type': 'listitem', 'value': [{'type': 'input', 'name': 'Experience Points', 'label': 'Experience Points', 'value': 2000000}]}, {'type': 'listitem', 'value': [{'type': 'checkbox', 'name': 'Inspiration', 'label': 'Inspiration', 'value': true}]}], 'css': 'header'}]}, {'type': 'list', 'value': [{'name': 'Attributes', 'content': [{'type': 'listitem', 'value': [{'type': 'input', 'name': 'Proficiency Bonus', 'label': 'Proficiency Bonus', 'value': 6}]}, {'type': 'listitem', 'value': [{'type': 'input', 'name': 'Passive Perception', 'label': 'Passive Perception', 'value': 10}]}, {'type': 'list', 'value': [{'name': 'Strength', 'content': [{'type': 'listitem', 'value': [{'type': 'input', 'name': 'Value', 'label': 'Value', 'value': 20}]}, {'type': 'listitem', 'value': [{'type': 'input', 'name': 'Modifier', 'label': 'Modifier', 'value': 5}]}, {'type': 'listitem', 'value': [{'type': 'checkbox', 'name': 'Trained', 'label': 'Trained', 'value': true}]}, {'type': 'list', 'value': [{'name': 'Skills', 'content': [{'type': 'listitem', 'value': [{'type': 'checkbox', 'name': 'Athletics', 'label': 'Athletics', 'value': true}]}]}]}]}]}, {'type': 'list', 'value': [{'name': 'Dexterity', 'content': [{'type': 'listitem', 'value': [{'type': 'input', 'name': 'Value', 'label': 'Value', 'value': 20}]}, {'type': 'listitem', 'value': [{'type': 'input', 'name': 'Modifier', 'label': 'Modifier', 'value': 5}]}, {'type': 'listitem', 'value': [{'type': 'checkbox', 'name': 'Trained', 'label': 'Trained', 'value': true}]}, {'type': 'list', 'value': [{'name': 'Skills', 'content': [{'type': 'listitem', 'value': [{'type': 'checkbox', 'name': 'Acrobatics', 'label': 'Acrobatics', 'value': false}]}, {'type': 'listitem', 'value': [{'type': 'checkbox', 'name': 'Sleight of Hand', 'label': 'Sleight of Hand', 'value': false}]}, {'type': 'listitem', 'value': [{'type': 'checkbox', 'name': 'Stealth', 'label': 'Stealth', 'value': false}]}]}]}]}]}, {'type': 'list', 'value': [{'name': 'Constitution', 'content': [{'type': 'listitem', 'value': [{'type': 'input', 'name': 'Value', 'label': 'Value', 'value': 20}]}, {'type': 'listitem', 'value': [{'type': 'input', 'name': 'Modifier', 'label': 'Modifier', 'value': 5}]}, {'type': 'listitem', 'value': [{'type': 'checkbox', 'name': 'Trained', 'label': 'Trained', 'value': true}]}]}]}, {'type': 'list', 'value': [{'name': 'Intelligence', 'content': [{'type': 'listitem', 'value': [{'type': 'input', 'name': 'Value', 'label': 'Value', 'value': 18}]}, {'type': 'listitem', 'value': [{'type': 'input', 'name': 'Modifier', 'label': 'Modifier', 'value': 4}]}, {'type': 'listitem', 'value': [{'type': 'checkbox', 'name': 'Trained', 'label': 'Trained', 'value': false}]}, {'type': 'list', 'value': [{'name': 'Skills', 'content': [{'type': 'listitem', 'value': [{'type': 'checkbox', 'name': 'Arcana', 'label': 'Arcana', 'value': false}]}, {'type': 'listitem', 'value': [{'type': 'checkbox', 'name': 'History', 'label': 'History', 'value': true}]}, {'type': 'listitem', 'value': [{'type': 'checkbox', 'name': 'Investigation', 'label': 'Investigation', 'value': false}]}, {'type': 'listitem', 'value': [{'type': 'checkbox', 'name': 'Nature', 'label': 'Nature', 'value': false}]}, {'type': 'listitem', 'value': [{'type': 'checkbox', 'name': 'Religion', 'label': 'Religion', 'value': false}]}]}]}]}]}, {'type': 'list', 'value': [{'name': 'Wisdom', 'content': [{'type': 'listitem', 'value': [{'type': 'input', 'name': 'Value', 'label': 'Value', 'value': 18}]}, {'type': 'listitem', 'value': [{'type': 'input', 'name': 'Modifier', 'label': 'Modifier', 'value': 4}]}, {'type': 'listitem', 'value': [{'type': 'checkbox', 'name': 'Trained', 'label': 'Trained', 'value': false}]}, {'type': 'list', 'value': [{'name': 'Skills', 'content': [{'type': 'listitem', 'value': [{'type': 'checkbox', 'name': 'Animal Handling', 'label': 'Animal Handling', 'value': false}]}, {'type': 'listitem', 'value': [{'type': 'checkbox', 'name': 'Insight', 'label': 'Insight', 'value': true}]}, {'type': 'listitem', 'value': [{'type': 'checkbox', 'name': 'Medicine', 'label': 'Medicine', 'value': false}]}, {'type': 'listitem', 'value': [{'type': 'checkbox', 'name': 'Perception', 'label': 'Perception', 'value': true}]}, {'type': 'listitem', 'value': [{'type': 'checkbox', 'name': 'Survival', 'label': 'Survival', 'value': false}]}]}]}]}]}, {'type': 'list', 'value': [{'name': 'Charisma', 'content': [{'type': 'listitem', 'value': [{'type': 'input', 'name': 'Value', 'label': 'Value', 'value': 18}]}, {'type': 'listitem', 'value': [{'type': 'input', 'name': 'Modifier', 'label': 'Modifier', 'value': 4}]}, {'type': 'listitem', 'value': [{'type': 'checkbox', 'name': 'Trained', 'label': 'Trained', 'value': false}]}, {'type': 'list', 'value': [{'name': 'Skills', 'content': [{'type': 'listitem', 'value': [{'type': 'checkbox', 'name': 'Deception', 'label': 'Deception', 'value': false}]}, {'type': 'listitem', 'value': [{'type': 'checkbox', 'name': 'Intimidation', 'label': 'Intimidation', 'value': false}]}, {'type': 'listitem', 'value': [{'type': 'checkbox', 'name': 'Performance', 'label': 'Performance', 'value': false}]}, {'type': 'listitem', 'value': [{'type': 'checkbox', 'name': 'Persuasion', 'label': 'Persuasion', 'value': true}]}]}]}]}]}], 'css': 'attributes'}]}, {'type': 'list', 'value': [{'name': 'Battle Info', 'content': [{'type': 'listitem', 'value': [{'type': 'input', 'name': 'Armor Class', 'label': 'Armor Class', 'value': 22}]}, {'type': 'listitem', 'value': [{'type': 'input', 'name': 'Initiative', 'label': 'Initiative', 'value': ''}]}, {'type': 'listitem', 'value': [{'type': 'input', 'name': 'Speed', 'label': 'Speed', 'value': 30}]}, {'type': 'listitem', 'value': [{'type': 'input', 'name': 'Hit Point Maximun', 'label': 'Hit Point Maximun', 'value': 250}]}, {'type': 'listitem', 'value': [{'type': 'input', 'name': 'Current Hit Points', 'label': 'Current Hit Points', 'value': 250}]}, {'type': 'listitem', 'value': [{'type': 'input', 'name': 'Temporary Hit Points', 'label': 'Temporary Hit Points', 'value': 0}]}, {'type': 'listitem', 'value': [{'type': 'input', 'name': 'Hit Dice', 'label': 'Hit Dice', 'value': '1d10'}]}, {'type': 'list', 'value': [{'name': 'Death Saves', 'content': [{'type': 'listitem', 'value': [{'type': 'input', 'name': 'Successes', 'label': 'Successes', 'value': 0}]}, {'type': 'listitem', 'value': [{'type': 'input', 'name': 'Failures', 'label': 'Failures', 'value': 0}]}]}]}], 'css': 'info'}]}, {'type': 'list', 'value': [{'name': 'Attacks and Spells', 'content': [], 'css': 'text-block'}]}, {'type': 'list', 'value': [{'name': 'Features and Traits', 'content': [], 'css': 'text-block'}]}, {'type': 'list', 'value': [{'name': 'Equipment', 'content': [{'type': 'list', 'value': [{'name': 'Coins', 'content': [{'type': 'listitem', 'value': [{'type': 'input', 'name': 'CP', 'label': 'CP', 'value': 0}]}, {'type': 'listitem', 'value': [{'type': 'input', 'name': 'SP', 'label': 'SP', 'value': 0}]}, {'type': 'listitem', 'value': [{'type': 'input', 'name': 'EP', 'label': 'EP', 'value': 0}]}, {'type': 'listitem', 'value': [{'type': 'input', 'name': 'GP', 'label': 'GP', 'value': 0}]}, {'type': 'listitem', 'value': [{'type': 'input', 'name': 'PP', 'label': 'PP', 'value': 0}]}]}]}, {'type': 'list', 'value': [{'name': 'Itens', 'content': []}]}], 'css': 'text-block'}]}, {'type': 'list', 'value': [{'name': 'Other Proficiencies and Languages', 'content': [{'type': 'list', 'value': [{'name': 'Weapon', 'content': []}]}, {'type': 'list', 'value': [{'name': 'Armor', 'content': []}]}, {'type': 'list', 'value': [{'name': 'Language', 'content': [{'type': 'listitem', 'value': [{'type': 'input', 'name': '0', 'label': '0', 'value': 'Common'}]}]}]}], 'css': 'text-block'}]}, {'type': 'list', 'value': [{'name': 'Role Play Notes', 'content': [{'type': 'listitem', 'value': [{'type': 'input', 'name': 'Personality Traits', 'label': 'Personality Traits', 'value': ''}]}, {'type': 'listitem', 'value': [{'type': 'input', 'name': 'Ideals', 'label': 'Ideals', 'value': ''}]}, {'type': 'listitem', 'value': [{'type': 'input', 'name': 'Bonds', 'label': 'Bonds', 'value': ''}]}, {'type': 'listitem', 'value': [{'type': 'input', 'name': 'Flaws', 'label': 'Flaws', 'value': ''}]}, {'type': 'listitem', 'value': [{'type': 'input', 'name': 'Backstory', 'label': 'Backstory', 'value': ''}]}], 'css': 'text-block'}]}];
    }
  }

}
