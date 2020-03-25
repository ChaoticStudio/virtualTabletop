import { Component, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { FieldConfig } from '@/field.interface'

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent implements OnInit {
  field: FieldConfig
  group: FormGroup
  className: string
  constructor() {}

  ngOnInit(): void {}
}
