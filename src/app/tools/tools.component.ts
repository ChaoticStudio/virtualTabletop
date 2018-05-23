import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {

  tool = 0;

  constructor() { }

  ngOnInit() {
  }

  setTool(toolID) {
    this.tool = toolID;
  }

}
