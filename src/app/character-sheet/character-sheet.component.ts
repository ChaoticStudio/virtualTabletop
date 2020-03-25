import { Component, OnInit, ViewChild } from '@angular/core'
import { FieldConfig } from '@/field.interface'
import { CharacterSheetService } from '@/character-sheet.service'
import { DynamicFormComponent } from '@/components/common/dynamic-form/dynamic-form.component'
import dnd5eSheet from './mocks/character-sheet-5e'

@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.scss']
})
export class CharacterSheetComponent implements OnInit {
  constructor(private _characterSheetService: CharacterSheetService) {}

  sheet = dnd5eSheet

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent
  sheetConfig: FieldConfig[] = undefined

  ngOnInit() {}

  submit(value: any) {}

  sheetParser(sheet) {
    const toReturn = []
    for (const element of Object.keys(sheet)) {
      if (element === 'css-class') {
        continue
      }
      if (typeof sheet[element] === 'object') {
        toReturn.push({
          type: 'list',
          value: [
            {
              name: element,
              content: this.sheetParser(sheet[element]),
              css: sheet[element]['css-class']
            }
          ]
        })
      } else {
        let elementValue
        if (typeof sheet[element] === 'boolean') {
          elementValue = [
            {
              type: 'checkbox',
              name: element,
              label: element,
              value: sheet[element]
            }
          ]
        } else {
          elementValue = [
            {
              type: 'input',
              name: element,
              label: element,
              value: sheet[element]
            }
          ]
        }
        toReturn.push({
          type: 'listitem',
          value: elementValue
        })
      }
    }
    return toReturn
  }

  loadSheets() {
    const owner = 'Doug'
    this._characterSheetService.getCharacterSheet(owner).subscribe(
      resData => (this.sheetConfig = this.sheetParser(this.sheet)) // this.sheetParser(resData['sheet'])
    )
  }
}
