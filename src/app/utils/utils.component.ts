import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-utils',
  templateUrl: './utils.component.html',
  styleUrls: ['./utils.component.scss'],
  })

export class UtilsComponent implements OnInit {

  option = 1;
  lastOption = 1;
  gridTemplate = '';
  constructor () { }

  ngOnInit() {
    this.gridTemplate = document.getElementById('tabletop-center').style.getPropertyValue('grid-template-columns');
   }

  setTab(option) {
    this.option = option;
    document.getElementById('tabletop-center').style.setProperty('grid-template-columns', this.gridTemplate);
  }

  collapse() {
    if (this.option !== 0) {
      this.gridTemplate = document.getElementById('tabletop-center').style.getPropertyValue('grid-template-columns');
      this.lastOption = this.option;
      document.getElementById('tabletop-center').style.setProperty('grid-template-columns', '50px calc(100% - 50px)');
      this.option = 0;
    } else {
      this.setTab(this.lastOption);
    }

  }
}
