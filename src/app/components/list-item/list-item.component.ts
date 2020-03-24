import { Component, OnInit, HostBinding } from '@angular/core'
import { FieldConfig } from '@/field.interface'

@Component({
  selector: 'app-list-item',
  template: `
    <mat-list-item>
      <div class="list-item-container" *ngIf="isObject(); else template">
        <ng-container
          *ngFor="let field of field.value"
          dynamicField
          [field]="field"
        >
        </ng-container>
      </div>
      <ng-template #template>
        <h4 mat-line>{{ field.value.name }}: {{ field.value.value }}</h4>
      </ng-template>
    </mat-list-item>
  `,
  styleUrls: ['../sheet.scss']
})
export class ListItemComponent implements OnInit {
  field: FieldConfig

  constructor() {}
  @HostBinding('class') class: string;
  ngOnInit() {
    this.class = this.field.value[0].className
  }

  isObject(): boolean {
    return this.field.value.length !== undefined
  }
}
