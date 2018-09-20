import { Component, OnInit } from '@angular/core';
import { FieldConfig } from "../../field.interface";

@Component({
  selector: 'app-list',
  template: `
  <mat-list>
    <ng-container *ngFor="let groupName of field.value;">
      <h3 mat-subheader>{{groupName.name}}</h3>
      <dynamic-form [fields]="groupName.content"></dynamic-form>
      <mat-divider></mat-divider> 
    </ng-container>
  </mat-list>
  `,
  styles: []
})
export class ListComponent implements OnInit {
  objectKeys = Object.keys;

  field: FieldConfig;

  constructor() { }

  ngOnInit() {
  }

}
