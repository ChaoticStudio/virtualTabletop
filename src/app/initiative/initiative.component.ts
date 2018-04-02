import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-initiative',
  templateUrl: './initiative.component.html',
  styleUrls: ['./initiative.component.css']
})
export class InitiativeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  roll20() {
    return Math.floor(Math.random() * 20 + 1);
  }

  addToTurnMember() {
    const list =       <HTMLDivElement>document.getElementById('initItemList'),
          name =      (<HTMLInputElement>document.getElementById('initName')).value;

    const newElement = (element) => {
      return document.createElement(element);
    };

    let initiative = (<HTMLInputElement>document.getElementById('initRoll')).value;
    if (initiative != null || initiative < '1') {
      initiative = String(this.roll20());
    }

    let card, item, itemName, itemValue, itemBtn, closeBtn, span;
    card =      <HTMLDivElement>newElement('div');
    item =      <HTMLDivElement>newElement('div');
    itemName =  <HTMLDivElement>newElement('div');
    itemValue = <HTMLDivElement>newElement('div');
    itemBtn =   <HTMLButtonElement>newElement('button');
    closeBtn =  <HTMLButtonElement>newElement('button');
    span =      <HTMLSpanElement>newElement('span');

    card.setAttribute('class', 'callout');
    item.setAttribute('class', 'initItem');
    itemName.setAttribute('id', 'initItemName');
    itemValue.setAttribute('id', 'initItemValue');
    itemBtn.setAttribute('id', 'initItemBtn');
    itemBtn.setAttribute('class', 'button');
    closeBtn.setAttribute('class', 'close-button');
    closeBtn.setAttribute('aria-label', 'Close alert');
    span.setAttribute('aria-hidden', 'true');

    itemName.appendChild(document.createTextNode(name));
    itemValue.appendChild(document.createTextNode(initiative));
    item.appendChild(itemName);
    item.appendChild(itemValue);
    itemBtn.innerHTML = '&#8635;';
    item.appendChild(itemBtn);
    span.innerHTML = '&times;';
    closeBtn.appendChild(span);
    // closeBtn.addEventListener('click', this.deleteFromTurnOrder(card.getNode()));
    card.appendChild(item);
    card.appendChild(closeBtn);
    list.appendChild(card);
  }

  deleteFromTurnOrder(self) {
      self.parentNode.removeChild(self);
  }

}
