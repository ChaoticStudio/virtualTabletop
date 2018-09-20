import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '../../field.interface';

@Component({
  selector: 'app-list-item',
  template: `
    <mat-list-item>
      <div *ngIf="isObject(); else template">
        <dynamic-form [fields]="field.value"></dynamic-form>
      </div>
      <ng-template #template>
        <p> {{field.value.name}}: {{field.value.value}} </p>
      </ng-template>
    </mat-list-item>
  `,
  styles: []
})
export class ListItemComponent implements OnInit {

  field: FieldConfig;
  
  constructor() { }

  ngOnInit() {
  }

  isObject(): boolean{
    return this.field.value.length !== undefined;
  }
}
