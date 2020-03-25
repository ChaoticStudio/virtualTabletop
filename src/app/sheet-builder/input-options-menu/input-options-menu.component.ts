import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core'
import { FieldConfig } from '@/field.interface'
import { CharacterSheetService } from '@/character-sheet.service'
import { UserdataService } from '@/userdata.service'
import { FormGroup, FormBuilder, FormControl } from '@angular/forms'
import { Observable } from 'rxjs'
import { map, startWith } from 'rxjs/operators'
import { DynamicFormComponent } from '@/components/common/dynamic-form/dynamic-form.component'
import dnd5eSheet from './mocks/sheet-builder-5e-preview'
@Component({
  selector: 'app-input-options-menu',
  templateUrl: './input-options-menu.component.html',
  styleUrls: ['./input-options-menu.component.scss']
})
export class InputOptionsMenuComponent implements OnInit {
  form: FormGroup
  formControl = new FormControl()
  systems: string[] = [
    'None',
    'D&D 5e',
    'Call of Cthulhu 7e',
    'Ars Magica 5e',
    '7th Sea 2e'
  ]
  options: string[] = ['Class', 'Race', 'Three']
  filteredOptions: Observable<string[]>
  hasNumber = true

  selectedComponent: FieldConfig
  dictionaries = {
    Class: ['Fighter', 'Wizard', 'Rogue'],
    Race: ['Human', 'Dwarf', 'Elf']
  }

  @ViewChild(DynamicFormComponent)
  previewForm: DynamicFormComponent
  sheetPreview: FieldConfig[] = dnd5eSheet
  @Output() sheetUpdateEvent = new EventEmitter<FieldConfig[]>()

  constructor(
    private _characterSheetService: CharacterSheetService,
    private _userDataService: UserdataService,
    private _fb: FormBuilder
  ) {
    this.form = _fb.group({
      system: 'Custom',
      hasBorder: true,
      direction: 'Horizontal',
      label: '',
      inputType: 'text',
      hasNumber: true,
      dictionary: '',
      isMultipleSelection: false
    })
  }

  ngOnInit() {
    this.filteredOptions = this.formControl.valueChanges.pipe(
      startWith(''),
      map((value: string) => this.filterOptions(value))
    )
    this.sheetUpdateEvent.emit(this.sheetPreview)
  }

  private filterOptions = (value: string): string[] =>
    this.options.filter(option =>
      option.toLowerCase().includes(value.toLowerCase())
    )

  submit(event) {}

  addProperty(property: string) {
    const label = this.form.value.label
    switch (property) {
      case 'Container':
        this.selectedComponent = {
          type: 'list',
          value: [{ name: label, content: [] }]
        }
        this.sheetPreview.push(this.selectedComponent)
        break
      case 'Input':
        this.selectedComponent.value[0].content.push({
          type: 'listitem',
          value: [
            {
              type: 'input',
              inputType: this.form.value.inputType,
              name: label,
              label: label
            }
          ]
        })
        break
      case 'Textarea':
        this.selectedComponent.value[0].content.push({
          type: 'listitem',
          value: [
            {
              type: 'textarea',
              name: label,
              label: label
            }
          ]
        })
        break
      case 'Select':
        this.selectedComponent.value[0].content.push({
          type: 'listitem',
          value: [
            {
              type: 'select',
              name: label,
              label: label,
              options: this.dictionaries[this.form.value.dictionary]
            }
          ]
        })
        break
      case 'Checkbox':
        const checkboxValue: FieldConfig[] = []
        if (this.form.value.hasNumber) {
          checkboxValue.push({
            type: 'skill',
            inputType: 'number',
            name: label,
            label: label
          })
        } else {
          checkboxValue.push({
            type: 'checkbox',
            name: label
          })
        }
        this.selectedComponent.value[0].content.push({
          type: 'listitem',
          value: checkboxValue
        })
        break
    }
    this.sheetUpdateEvent.emit(this.sheetPreview)
  }

  saveTemplate() {
    const a = document.createElement('a')
    const obj = JSON.stringify([].concat(...this.sheetPreview))
    const file = new Blob([obj], { type: 'text/plain' })
    a.href = URL.createObjectURL(file)
    a.download = 'template'
    a.click()
  }

  changeTemplate(template: string) {
    switch (template) {
      case this.systems[0]: // None
        this.sheetPreview = []
        break
      case this.systems[1]: // 5e
        this.sheetPreview = []
        break
    }
  }
}
