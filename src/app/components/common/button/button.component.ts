import { Component, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { FieldConfig } from '@/field.interface'
@Component({
  selector: 'app-button',
  template: `
    <div *ngIf="group" [formGroup]="group">
      <button type="submit" mat-raised-button color="field.color">
        {{ field.label }}
      </button>
    </div>

    <div *ngIf="!group">
      <button type="submit" mat-raised-button color="field.color">
        {{ field.label }}
      </button>
    </div>
  `,
  styles: []
})
export class ButtonComponent implements OnInit {
  field: FieldConfig
  group: FormGroup
  constructor() {}
  ngOnInit() {}
}
