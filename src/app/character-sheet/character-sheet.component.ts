import { Component, OnInit } from '@angular/core';
import { CharacterSheetService } from './../character-sheet.service';
import * as socketIo from 'socket.io-client';


@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.css'],
  providers: [CharacterSheetService]
})
export class CharacterSheetComponent implements OnInit {

  characterSheetObject: Object;
  debug;
  characterSheetKeys: Array<String>;

  constructor(private _characterSheetService: CharacterSheetService) { }

  postMessage(owner : String, characterSheet: Object) {
    this._characterSheetService.addCharacterSheet(owner, characterSheet).subscribe(resNewCharacterSheet => {
      console.log(resNewCharacterSheet);
      this.characterSheetObject = resNewCharacterSheet.sheet;
      this.characterSheetKeys = Object.keys(this.characterSheetObject);
    });
  }

  ngOnInit() {
    this._characterSheetService.getCharacterSheet('test').subscribe((resData) => this.loadFields(resData));
  }

  loadFields(data) {
    this.characterSheetObject = data['sheet'];
    this.characterSheetKeys = Object.keys(this.characterSheetObject);
  }

  saveFields() {
    const owner = (<HTMLInputElement>document.getElementById('character-sheet-owner')).value;
    const object = (<HTMLInputElement>document.getElementById('character-test-input')).value;
    this.postMessage(owner, JSON.parse(object));
  }

}
