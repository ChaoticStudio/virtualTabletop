import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";

@Component({
  selector: 'app-grid-list',
  template: `
  <mat-grid-list cols="2" rowHeight="2:1">
    <mat-grid-tile *ngFor="let name of objectKeys(field.value);">
      <mat-grid-tile-header>{{name}}</mat-grid-tile-header>
      <div *ngIf="isObject(field.value[name]); else content">
        <ng-container *ngFor="let field of field.value[name];" dynamicField [field]="field" [group]="form">
        </ng-container>
      </div>
      <ng-template #content>
        {{field.value[name]}}
      </ng-template>
    </mat-grid-tile>
  </mat-grid-list>
  `,
  styles: []
})
export class GridListComponent implements OnInit {
  objectKeys = Object.keys;
  field: FieldConfig;
  group: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  isObject(value): boolean {
    return typeof(value) === 'object'
  }
}
