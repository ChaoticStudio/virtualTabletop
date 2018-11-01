import { Component, OnInit, ViewChildren, ViewChild } from '@angular/core';
import { FieldConfig } from './../field.interface';
import { CharacterSheetService } from './../character-sheet.service';
import { UserdataService } from '../userdata.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { DynamicFormComponent } from '../components/dynamic-form/dynamic-form.component';
// import { DynamicFormComponent } from '../components/dynamic-form/dynamic-form.component';

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
                  dictionary: ''
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

  updateComponent() {
    this.sheetPreview[this.sheetPreview.indexOf(this.selectedComponent)].value[0].name = this.form.value.label;
  }

  addProperty(property: string) {
    console.log(property);
    switch (property) {
      case 'Container':
        this.selectedComponent = {type: 'list', value: [{name: this.form.value.label, content: []}]};
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
                name: this.form.value.label,
                label: this.form.value.label
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
                name: this.form.value.label,
                label: this.form.value.label
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
                name: this.form.value.label,
                label: this.form.value.label,
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
            name: this.form.value.label,
            label: this.form.value.label,
          }
        ];
        if (this.form.value.hasNumber) {
          checkboxValue.push({
            type: 'input',
            inputType: 'number',
            name: this.form.value.label,
            label: this.form.value.label
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
}
