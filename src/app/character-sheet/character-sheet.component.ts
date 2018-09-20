import { Component, OnInit, ViewChild } from '@angular/core';
import { FieldConfig } from "./../field.interface";
import { DynamicSheetComponent } from "./../components/dynamic-sheet/dynamic-sheet.component";
import { CharacterSheetService } from './../character-sheet.service';
import { DynamicFormComponent } from '../components/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.css']
})
export class CharacterSheetComponent implements OnInit {

  constructor(private _characterSheetService: CharacterSheetService) { }

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  sheetConfig: FieldConfig[] = [
    {
      type: 'list',
      value: [ 
        {
          name: 'Character',
          content: [
            {
              type: 'listitem',
              value: {
                name: 'Name',
                value: 'Azael'
              }
            }, {
              type: 'listitem',
              value: {
                name: 'Class',
                value: 'Bruxão loco'
              }
            }
          ]
        }
      ]
    }, {
      type: 'list',
      value: [ 
        {
          name: "Attributes",
          content: [
            {
              type: 'listitem',
              value: {
                name: 'Proficiency Bonus',
                value: 6
              },
            }, {
              type: 'listitem',
              value: {
                name:'Passive Perception',
                value: 10
              }
            }, {
              type: 'list',
              value: [
                {
                  name: 'Strength',
                  content: [
                    {
                      type: 'listitem',
                      value: {
                        name: 'Value',
                        value: 20
                      }
                    }, {
                      type: 'listitem',
                      value: {
                        name: 'Modifier',
                        value: 5
                      }
                    }, {
                      type: 'listitem',
                      value: [{
                        type: 'checkbox',
                        name: 'treinado',
                        label: 'Treinado',
                        value: false
                      }]
                    }, {
                      type: 'list',
                      value: [
                        {
                          name: 'Skills',
                          content: [
                            {
                              type: 'listitem',
                              value: [{
                                type: 'checkbox',
                                name: 'athletics',
                                label: 'Athletics',
                                value: true
                              }]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  ngOnInit() {
  }

  submit(value: any) {
  }

  loadSheets() {
    const owner = 'Doug';
    /*this._characterSheetService.getCharacterSheet(owner).subscribe(
      resData => this.sheetConfig[0].value = resData['sheet']*/
      
  }

}
