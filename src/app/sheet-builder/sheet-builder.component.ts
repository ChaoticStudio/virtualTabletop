import { Component, OnInit } from '@angular/core'
import { FieldConfig } from '@/field.interface'

@Component({
  selector: 'app-sheet-builder',
  templateUrl: './sheet-builder.component.html',
  styleUrls: ['./sheet-builder.component.scss']
})
export class SheetBuilderComponent implements OnInit {
  constructor() {}

  sheetPreview: FieldConfig[]

  ngOnInit() {}

  onSheetUpdateEvent(sheetPreview: FieldConfig[]) {
    this.sheetPreview = sheetPreview
  }
}
