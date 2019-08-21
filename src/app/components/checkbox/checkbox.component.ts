import { Component, OnInit, ViewChildren, QueryList } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
@Component({
  selector: "app-checkbox",
  template: `
<div class="sheet-checkbox-container" [formGroup]="group" >
  <p>{{field.name}}</p>
  <mat-checkbox #sheetCheckbox *ngFor="let box of boxes;" value="0" [formControlName]="field.name" (change)="handleCheckboxGroup($event.source)" class="sheet-checkbox"></mat-checkbox>
</div>
`,
  styleUrls: [`../sheet.scss`]
})
export class CheckboxComponent implements OnInit {
  @ViewChildren('sheetCheckbox') private _checkboxes : QueryList<any>;
  field: FieldConfig;
  group: FormGroup;
  boxes = [];
  constructor() {}
  ngOnInit() {
    this.boxes.length = this.field.value;
  }

  handleCheckboxGroup(source: any) {
    if(this.field.value <= 1) return;

    let sourceIndex = 999;
    this._checkboxes.some((self, i, checkboxes)=>{
      // if self
      if(self.id === source.id) {
        sourceIndex = i;
        //next.checked == false
        if(!checkboxes[Math.min(i+1, checkboxes.length-1)].checked)
          return true; // avoid unnecessary loops
      }
      self.checked = i <= sourceIndex ? true: false;
    });
  }
}