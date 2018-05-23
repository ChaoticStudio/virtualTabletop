import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-initiative',
  templateUrl: './initiative.component.html',
  styleUrls: ['./initiative.component.css']
})
export class InitiativeComponent implements OnInit {

  turnMembers = 0;
  list;

  constructor() { }

  ngOnInit() {
    this.list = <HTMLDivElement>document.getElementById('initItemList');
  }

  roll20(modifier = 0) {
    return Math.floor(Math.random() * 20 + 1) + modifier;
  }

  addToTurnMember() {
    let name = (<HTMLInputElement>document.getElementById('initName')).value,
        id = ++this.turnMembers; // other wise npc could be 0
        name === '' ? name = 'NPC ' + id : name = name;

    const newElement = (element) => {
      return document.createElement(element);
    };

    let initiative = (<HTMLInputElement>document.getElementById('initRoll')).value;
    if (initiative === '') {
      initiative = String(this.roll20());
    }

    let card, item, itemName, itemNameInput, itemValue, itemBtn, closeBtn, span;
    card =      <HTMLDivElement>newElement('div');
    item =      <HTMLDivElement>newElement('div');
    itemName =  <HTMLDivElement>newElement('div');
    itemNameInput =  <HTMLInputElement>newElement('input');
    itemValue = <HTMLDivElement>newElement('div');
    itemBtn =   <HTMLButtonElement>newElement('button');
    closeBtn =  <HTMLButtonElement>newElement('button');
    span =      <HTMLSpanElement>newElement('span');

    card.setAttribute('class', 'callout');
    item.setAttribute('class', 'initItem');
    itemName.setAttribute('class', 'initItemName');
    itemNameInput.setAttribute('class', 'initItemNameInput');
    itemNameInput.setAttribute('type', 'text');
    itemNameInput.style.setProperty('display', 'none');
    itemValue.setAttribute('class', 'initItemValue');
    itemBtn.setAttribute('class', 'initItemBtn button');
    closeBtn.setAttribute('class', 'closeBtn alert button');
    closeBtn.setAttribute('aria-label', 'Close alert');
    span.setAttribute('aria-hidden', 'true');

    itemName.appendChild(document.createTextNode(name));
    itemName.addEventListener('click', (event) => this.updateName(event, false));
    itemNameInput.addEventListener('blur', (event) => this.updateName(event));
    itemValue.appendChild(document.createTextNode(initiative));
    item.appendChild(itemName);
    item.appendChild(itemNameInput);
    item.appendChild(itemValue);
    itemBtn.innerHTML = '<i class="fas fa-redo-alt"></i>';
    itemBtn.addEventListener('click', () => this.updateInitiative('#char' + id));
    item.appendChild(itemBtn);
    span.innerHTML = '<i class="fas fa-trash-alt"></i>';
    closeBtn.appendChild(span);
    closeBtn.addEventListener('click', () => this.deleteFromTurnOrder('#char' + id));
    item.appendChild(closeBtn);
    card.appendChild(item);
    card.setAttribute('id', 'char' + id);
    this.list.appendChild(card);
  }

  deleteFromTurnOrder(theOne2bRemoved) {
    const node = document.querySelector(theOne2bRemoved);
    if (node !== null) {
      node.parentNode.removeChild(node);
    }
  }

  updateInitiative(theOne2bUpdated) {
    const node = (<HTMLDivElement>document.querySelector(theOne2bUpdated)).firstElementChild.children[2];
    if (node !== null) {
      node.textContent = this.roll20().toString();
    }
  }

  updateName (self: Event, display = true) {
    if (display) {
      const itemInput = (<HTMLInputElement>self.target);
      const itemName = (<HTMLDivElement>itemInput.parentElement.querySelector('.initItemName'));

      itemName.textContent = itemInput.value;
      // remove display none, so display becomes block again
      itemName.style.removeProperty('display');
      itemInput.style.setProperty('display', 'none');
    } else {
      const itemName = (<HTMLDivElement>self.target);
      const itemInput = (<HTMLInputElement>itemName.parentElement.querySelector('.initItemNameInput'));

      itemInput.value = itemName.textContent;
      itemInput.style.removeProperty('display');
      itemInput.focus();
      itemName.style.setProperty('display', 'none');
    }
  }

}
