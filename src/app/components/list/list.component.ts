import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '../../field.interface';

@Component({
  selector: 'app-list',
  template: `
  <mat-list class="mat-list sheet-container">
    <ng-container *ngFor="let groupName of field.value;">
      <h3 mat-subheader>{{groupName.name}}</h3>
      <dynamic-form class="sheet-list-form" [fields]="groupName.content"></dynamic-form>
    </ng-container>
  </mat-list>
  `,
  styleUrls: [`../sheet.scss`]
})
export class ListComponent implements OnInit {

  field: FieldConfig;

  constructor() { }

  ngOnInit() {
  }

}
