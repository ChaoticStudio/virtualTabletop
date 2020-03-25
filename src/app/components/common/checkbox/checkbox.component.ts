import { Component, OnInit, ViewChildren, QueryList } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { FieldConfig } from '@/field.interface'
@Component({
  selector: 'app-checkbox',
  template: `
    <div *ngIf="group" class="sheet-checkbox-container gt" [formGroup]="group">
      <label>{{ field.name }}</label>
      <mat-checkbox
        #sheetCheckbox
        *ngFor="let box of boxes"
        value="0"
        [formControlName]="field.name"
        (change)="handleCheckboxGroup($event.source)"
        class="sheet-checkbox"
      ></mat-checkbox>
    </div>

    <div *ngIf="!group" class="sheet-checkbox-container gt">
      <label>{{ field.name }}</label>
      <mat-checkbox
        #sheetCheckbox
        *ngFor="let box of boxes"
        value="0"
        (change)="handleCheckboxGroup($event.source)"
        class="sheet-checkbox"
      ></mat-checkbox>
    </div>
  `,
  styleUrls: [`../sheet.scss`]
})
export class CheckboxComponent implements OnInit {
  @ViewChildren('sheetCheckbox') private _checkboxes: QueryList<
    HTMLInputElement
  >
  field: FieldConfig
  group: FormGroup
  boxes = []
  constructor() {}
  ngOnInit() {
    this.boxes.length = this.field.value
  }

  handleCheckboxGroup(source: HTMLInputElement) {
    if (this.field.value <= 1) {
      return
    }

    let sourceIndex = Number.POSITIVE_INFINITY
    const checkboxes = this._checkboxes.toArray()
    // inspect
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].id === source.id) {
        sourceIndex = i
        if (!checkboxes[i + 1]?.checked) {
          break
        }
      }
      checkboxes[i].checked = i <= sourceIndex
    }
  }
}
