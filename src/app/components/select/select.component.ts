import { Component, OnInit, HostBinding } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { FieldConfig } from '../../field.interface'
@Component({
  selector: 'app-select',
  template: `
    <mat-form-field
      *ngIf="group"
      class="sheet-select"
      [formGroup]="group"
    >
      <mat-select [placeholder]="field.label" [formControlName]="field.name">
        <mat-option *ngFor="let item of field.options" [value]="item">{{
          item
        }}</mat-option>
      </mat-select>
    </mat-form-field>

    <mat-form-field *ngIf="!group" class="sheet-select">
      <mat-select [placeholder]="field.label">
        <mat-option *ngFor="let item of field.options" [value]="item">{{
          item
        }}</mat-option>
      </mat-select>
    </mat-form-field>
  `,
  styleUrls: ['../sheet.scss']
})
export class SelectComponent implements OnInit {
  field: FieldConfig
  group: FormGroup
  constructor() {}
  ngOnInit() {}
}
