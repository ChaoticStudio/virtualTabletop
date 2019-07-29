import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '../../field.interface';

@Component({
  selector: 'app-list',
  template: `
  <mat-list class="mat-list sheet-container {{field.value[0].css}}">
    <ng-container *ngFor="let groupName of field.value;">
      <h3 mat-subheader>{{groupName.name}}</h3>
      <dynamic-form class="sheet-list-form" [fields]="groupName.content"></dynamic-form>
    </ng-container>
  </mat-list>
  <mat-divider></mat-divider>
  `,
  styles: [
    `
    .sheet-container {
      border-radius: 5px;
      margin: 5px auto;
      box-shadow: 1px 1px 8px rgba(0,0,0,0.25);
    }

    ::ng-deep .sheet-list-form form {
      display: flex;
      flex-wrap: wrap;
    }

    `
  ]
})
export class ListComponent implements OnInit {

  field: FieldConfig;

  constructor() { }

  ngOnInit() {}

}
