import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-initiative',
  templateUrl: './initiative.component.html',
  styleUrls: ['./initiative.component.css']
})
export class InitiativeComponent implements OnInit {

  turnMembers = 0;
  list;
  hasEvent = false;

  constructor() { }

  ngOnInit() {
    this.list = <HTMLDivElement>document.getElementById('initItemList');
  }

  roll20(modifier = 0) {
    return Math.floor(Math.random() * 20 + 1) + modifier;
  }

  addToTurnMember() {
    // ++First otherwise id=1 is repeated
    const id = this.list.hasChildNodes() ? ++this.turnMembers : this.turnMembers = 1;
    const initNameValue = (<HTMLInputElement>document.getElementById('initName')).value;
    const name = initNameValue === '' ? 'NPC ' + id : initNameValue;

    const newElement = (element) => {
      return document.createElement(element);
    };

    let initiative = (<HTMLInputElement>document.getElementById('initRoll')).value;
    if (initiative === '') {
      initiative = String(this.roll20());
    } else if (parseInt(initiative, 10) < 0 || initiative.startsWith('+')) {
      initiative = String(this.roll20(parseInt(initiative.replace('+', ''), 10)));
    }

    let card, character, characterName, characterNameInput,
        characterInitiative, characterInitiativeInput, refreshButton, deleteButton;
    card                      = <HTMLDivElement>newElement('div');
    character                 = <HTMLDivElement>newElement('div');
    characterName             = <HTMLDivElement>newElement('div');
    characterNameInput        = <HTMLInputElement>newElement('input');
    characterInitiative       = <HTMLDivElement>newElement('div');
    characterInitiativeInput  = <HTMLInputElement>newElement('input');
    refreshButton             = <HTMLButtonElement>newElement('button');
    deleteButton              = <HTMLButtonElement>newElement('button');

    card.setAttribute('class', 'callout');
    character.setAttribute('class', 'initItem');
    characterName.setAttribute('class', 'initItemName');
    characterNameInput.setAttribute('class', 'initItemNameInput');
    characterNameInput.setAttribute('type', 'text');
    characterNameInput.style.setProperty('display', 'none');
    characterInitiative.setAttribute('class', 'initItemValue');
    characterInitiativeInput.setAttribute('class', 'initItemInitiativeInput');
    characterInitiativeInput.setAttribute('type', 'text');
    characterInitiativeInput.style.setProperty('display', 'none');
    refreshButton.setAttribute('class', 'initItemBtn button');
    deleteButton.setAttribute('class', 'closeBtn alert button');

    characterName.appendChild(document.createTextNode(name));
    characterName.addEventListener('click', (event) => this.updateName(event.target));
    characterNameInput.addEventListener('blur', (event) => this.updateName(event.target, true));
    characterInitiative.appendChild(document.createTextNode(initiative));
    characterInitiative.addEventListener('click', (event) => this.updateInitiative(event.target, false));
    character.appendChild(characterName);
    character.appendChild(characterNameInput);
    character.appendChild(characterInitiative);
    character.appendChild(characterInitiativeInput);
    refreshButton.innerHTML = '<i class="fas fa-redo-alt"></i>';
    refreshButton.addEventListener('click', (event) => {
      this.updateInitiative(event.target.parentNode.parentNode.firstElementChild.children[2]);
    });
    character.appendChild(refreshButton);
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteButton.addEventListener('click', (event) => {
      this.deleteFromTurnOrder(event.target.parentNode.parentNode);
    });
    character.appendChild(deleteButton);
    card.appendChild(character);
    card.setAttribute('id', 'char' + id);
    this.list.appendChild(card);
  }

  deleteFromTurnOrder(theOne2bRemoved) {
    theOne2bRemoved.parentNode.removeChild(theOne2bRemoved);
  }

  updateInitiative(theOne2bUpdated, random = true) {
    if (random) {
      theOne2bUpdated.textContent = this.roll20().toString();
    } else {
      const initiative  = (<HTMLDivElement>theOne2bUpdated);
      const initiativeInput = (<HTMLInputElement>initiative.parentElement.querySelector('.initItemInitiativeInput'));

      initiativeInput.value = initiative.textContent;
      initiativeInput.style.removeProperty('display');
      initiativeInput.focus();
      if (!this.hasEvent) {
        this.hasEvent = true;
        initiativeInput.addEventListener('blur', (event) => {
          const input = (<HTMLInputElement>event.target);
          const init  = (<HTMLDivElement>input.parentElement.querySelector('.initItemValue'));

          init.textContent = input.value;
          // remove 'display: none', so it becomes 'display: block' again
          init.style.removeProperty('display');
          input.style.setProperty('display', 'none');
        });
      }
      initiative.style.setProperty('display', 'none');
    }
  }

  updateName (theOne2bRenamed, isInput = false) {
    if (isInput) {
      const itemInput = (<HTMLInputElement>theOne2bRenamed);
      const itemName  = (<HTMLDivElement>itemInput.parentElement.querySelector('.initItemName'));

      itemName.textContent = itemInput.value;
      // remove 'display: none', so it becomes 'display: block' again
      itemName.style.removeProperty('display');
      itemInput.style.setProperty('display', 'none');
    } else {
      const itemName  = (<HTMLDivElement>theOne2bRenamed);
      const itemInput = (<HTMLInputElement>itemName.parentElement.querySelector('.initItemNameInput'));

      itemInput.value = itemName.textContent;
      itemInput.style.removeProperty('display');
      itemInput.focus();
      itemName.style.setProperty('display', 'none');
    }
  }

}
