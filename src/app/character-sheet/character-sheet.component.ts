import { Component, OnInit, ViewChild } from '@angular/core';
import { FieldConfig } from "./../field.interface";
import { CharacterSheetService } from './../character-sheet.service';
import { DynamicFormComponent } from '../components/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.css']
})
export class CharacterSheetComponent implements OnInit {

  constructor(private _characterSheetService: CharacterSheetService) { }

  sheet = {
    "Character": {
      "name": "Arlow",
      "Classe": "Fighter",
      "Level": 30,
      "Race": "Human",
      "Alignment": "Neutral Good",
      "Experience Points": 2000000,
      "Inspiration": true
    },
    "Attributes": {
      "Proficiency Bonus": 6,
      "Passive Perception": 10,
      "Strength": {
          "Score": 20,
          "Modifier": 5,
          "Trained": true,
          "Skills": {
              "Athletics": true
          }
      },
      "Dexterity": {
        "Score": 20,
        "Modifier": 5,
        "Trained": true,
        "Skills": {
            "Acrobatics": false,
            "Sleight of Hand": false,
            "Stealth": false
        }
      },
      "Constitution": {
        "Score": 20,
        "Modifier": 5,
        "Trained": true
      },
        "Intelligence": {
            "Score": 18,
            "Modifier": 4,
            "Trained": false,
            "Skills": {
                "Arcana": false,
                "History": true,
                "Investigation": false,
                "Nature": false,
                "Religion": false
            }
        },
        "Wisdom": {
            "Score": 18,
            "Modifier": 4,
            "Trained": false,
            "Skills": {
                "Animal Handling": false,
                "Insight": true,
                "Medicine": false,
                "Perception": true,
                "Survival": false
            }
        },
        "Charisma": {
            "Score": 18,
            "Modifier": 4,
            "Trained": false,
            "Skills": {
                "Deception": false,
                "Intimidation": false,
                "Performance": false,
                "Persuasion": true
            }
        }
    },
    "Battle Info": {
        "Armor Class": 22,
        "Initiative": "",
        "Speed": 30,
        "Hit Point Maximum": 250,
        "Current Hit Points": 250,
        "Temporary Hit Points": 0,
        "Hit Dice": "1d10",
        "Death Saves": {
            "Successes": 0,
            "Failures": 0
        }
    },
    "Attacks and Spells": {},
    "Features and Traits": {},
    "Equipment": {
        "Coins": {
            "CP": 0,
            "SP": 0,
            "EP": 0,
            "GP": 0,
            "PP": 0
        },
        "Itens": {}
    },
    "Other Proficiency and Languages": {
        "Weapon": [],
        "Armor": [],
        "Language": [
            "Common"
        ]
    },
    "Role Play Notes": {
        "Personality Traits": "",
        "Ideals": "",
        "Bonds": "",
        "Flaws": "",
        "Backstory": ""
    }
};

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  sheetConfig: FieldConfig[] = undefined;

  ngOnInit() {
  }

  submit(value: any) {
  }

  sheetParser(sheet){
    let toReturn = [];
    for(let element of Object.keys(sheet)){
      if(typeof(sheet[element]) === 'object'){
        toReturn.push({
          type: 'list',
          value: [{
            name: element,
            content: this.sheetParser(sheet[element])
          }]
        });
      } else {
        let elementValue;
        if(typeof(sheet[element]) === 'boolean'){
          elementValue = [{
            type: 'checkbox',
            name: element,
            label: element,
            value: sheet[element]
          }];
        } else {
          elementValue = {
            name: element,
            value: sheet[element]
          }
        }
        toReturn.push({
          type: 'listitem',
          value: elementValue
        });
      }
    }
    return toReturn;
  }

  loadSheets() {
    const owner = 'Doug';
    this._characterSheetService.getCharacterSheet(owner).subscribe(
      resData => this.sheetConfig= this.sheetParser(resData['sheet'])
    );
  }

}
