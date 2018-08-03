import { Component, OnInit } from '@angular/core';
import { CharacterSheetService } from './../character-sheet.service';

@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.css']
})
export class CharacterSheetComponent implements OnInit {

  constructor(private _characterSheetService: CharacterSheetService) { }

  sheet: HTMLDivElement;
  toAppend = [];

  ngOnInit() {
    this.sheet = document.querySelector('.character-sheet-display');
  }

  createElement(element: string, text: string = null) {
    const tag = document.createElement(element);
    if (text) {
      tag.appendChild(document.createTextNode(text));
    }
    return tag;
  }

  loadFields(sheetObj, parentToAppendTo) {
    const characterSheetKeys = Object.keys(sheetObj);

    for (let i = 0; i < characterSheetKeys.length; i++) {
      if (typeof sheetObj[characterSheetKeys[i]] === 'object') {
        //console.log(characterSheetKeys[i]);
        this.toAppend.push(this.createElement('div', characterSheetKeys[i]));
        this.toAppend.push(this.createElement('hr'));
        this.loadFields(sheetObj[characterSheetKeys[i]], this.toAppend[i]);
      } else {
        //console.log(sheetObj[characterSheetKeys[i]]);
        this.toAppend.push(this.createElement('p', characterSheetKeys[i]));
        this.toAppend.push(this.createElement('p', ': ' + sheetObj[characterSheetKeys[i]]));
      }
      this.toAppend.push(this.createElement('hr'));
    }
  }

  loadSheets() {
    const owner = 'Doug';
    this._characterSheetService.getCharacterSheet(owner).subscribe(
      resData => {
        this.loadFields(resData['sheet'], 0);
        for (let i = 0; i < this.toAppend.length; i++) {
          this.sheet.appendChild(this.toAppend[i]);
        }
    });
  }

}
