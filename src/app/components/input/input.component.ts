import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
@Component({
  selector: "app-input",
  template: `
<mat-form-field class="sheet-input full-width" [formGroup]="group">
  <input class="sheet-input-text" matInput [formControlName]="field.name" [placeholder]="field.label" [type]="field.inputType">
  <ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
    <mat-error *ngIf="group.get(field.name).hasError(validation.name)">{{validation.message}}</mat-error>
  </ng-container>
</mat-form-field>
`,
  styleUrls: [`../sheet.scss`]
})
export class InputComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  className: string;
  constructor() {
  }
  ngOnInit() {
  }
}