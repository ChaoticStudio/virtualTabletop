import { Component, OnInit } from '@angular/core'
import { FieldConfig } from '../../field.interface'
import { FormBuilder, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-list',
  template: `
    <mat-list class="mat-list sheet-container">
      <ng-container *ngFor="let groupName of field.value">
        <h3 mat-subheader>{{ groupName.name }}</h3>

        <ng-container *ngIf="isObject(); else template">
          <ng-container
            *ngFor="let field of groupName.content"
            dynamicField
            [field]="field"
          >
          </ng-container>
        </ng-container>

        <ng-template #template>
          <mat-list-item>
            <h4 mat-line>{{ field.value.name }}: {{ field.value.value }}</h4>
          </mat-list-item>
        </ng-template>
      </ng-container>
    </mat-list>
  `,
  styleUrls: [`../sheet.scss`]
})
export class ListComponent implements OnInit {
  field: FieldConfig

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  isObject(): boolean {
    return this.field.value.length !== undefined
  }
}
