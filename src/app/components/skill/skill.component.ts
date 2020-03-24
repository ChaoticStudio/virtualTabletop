import { Component, OnInit } from '@angular/core'
import { FieldConfig } from '../../field.interface'
import { FormGroup } from '@angular/forms'

@Component({
  selector: 'app-skill',
  template: `
    <div *ngIf="group" class="skill" [formGroup]="group">
      <mat-checkbox
        class="skill-checkbox"
        [formControlName]="field.name"
      ></mat-checkbox>

      <mat-form-field class="skill-input-field" [formGroup]="group">
        <input
          class="skill-input"
          matInput
          [formControlName]="field.name"
          placeholder="{{ placeholder }}"
          type="number"
          max="999"
          (input)="onValueChange($event.target.value)"
        />
      </mat-form-field>

      <p class="skill-label">{{ field.label }}</p>
    </div>

    <div *ngIf="!group" class="skill">
      <mat-checkbox class="skill-checkbox"></mat-checkbox>

      <mat-form-field class="skill-input-field">
        <input
          class="skill-input"
          matInput
          placeholder="{{ placeholder }}"
          type="number"
          max="999"
          (input)="onValueChange($event.target.value)"
        />
      </mat-form-field>

      <p class="skill-label">{{ field.label }}</p>
    </div>
  `,
  styleUrls: ['../sheet.scss']
})
export class SkillComponent implements OnInit {
  field: FieldConfig
  group: FormGroup
  placeholder: string
  constructor() {}
  ngOnInit() {}
  onValueChange(value) {
    this.placeholder = `${Math.floor(value / 2)}% | ${Math.floor(value / 5)}%`
  }
}
