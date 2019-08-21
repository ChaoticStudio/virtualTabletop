import { Component, OnInit, HostBinding } from '@angular/core';
import { FieldConfig } from '../../field.interface';

@Component({
  selector: 'app-list-item',
  template: `
    <mat-list-item>
      <div class="full-width" *ngIf="isObject(); else template">
        <dynamic-form [fields]="field.value"></dynamic-form>
      </div>
      <ng-template #template>
        <h4 mat-line> {{field.value.name}}: {{field.value.value}} </h4>
      </ng-template>
    </mat-list-item>
  `,
  styleUrls: ['../sheet.scss']
})
export class ListItemComponent implements OnInit {

  field: FieldConfig;
  @HostBinding('class') className;
  constructor() { }
  ngOnInit() {
    this.className = this.field.value[0].className;
  }

  isObject(): boolean {
    return this.field.value.length !== undefined;
  }
}
