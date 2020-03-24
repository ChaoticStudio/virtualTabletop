import { Component, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { FieldConfig } from '@/field.interface'
@Component({
  selector: 'app-input',
  template: `
    <mat-form-field
      *ngIf="group"
      [className]="'sheet-input'"
      [formGroup]="group"
    >
      <input
        [className]="field.className"
        matInput
        [formControlName]="field.name"
        [placeholder]="field.label"
        [type]="field.inputType"
      />
      <ng-container
        *ngFor="let validation of field.validations"
        ngProjectAs="mat-error"
      >
        <mat-error *ngIf="group.get(field.name).hasError(validation.name)">{{
          validation.message
        }}</mat-error>
      </ng-container>
    </mat-form-field>

    <mat-form-field
      *ngIf="!group"
      [className]="'sheet-input'"
    >
      <input
        
        matInput
        [placeholder]="field.label"
        [type]="field.inputType"
      />
      <ng-container
        *ngFor="let validation of field.validations"
        ngProjectAs="mat-error"
      >
        <mat-error *ngIf="group.get(field.name).hasError(validation.name)">{{
          validation.message
        }}</mat-error>
      </ng-container>
    </mat-form-field>
  `,
  styleUrls: [`../sheet.scss`]
})
export class InputComponent implements OnInit {
  field: FieldConfig
  group: FormGroup
  className: string
  constructor() {}
  ngOnInit() {}
}
