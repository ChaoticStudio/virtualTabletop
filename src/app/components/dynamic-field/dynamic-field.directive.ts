import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnInit,
  ViewContainerRef
} from '@angular/core'
import { FormGroup } from '@angular/forms'
import { FieldConfig } from '@/field.interface'
import { InputComponent } from '@/components/input/input.component'
import { TextAreaComponent } from '@/components/text-area/text-area.component'
import { ButtonComponent } from '@/components/button/button.component'
import { SelectComponent } from '@/components/select/select.component'
import { DateComponent } from '@/components/date/date.component'
import { RadiobuttonComponent } from '@/components/radiobutton/radiobutton.component'
import { CheckboxComponent } from '@/components/checkbox/checkbox.component'
import { GridListComponent } from '@/components/grid-list/grid-list.component'
import { ListComponent } from '@/components/list/list.component'
import { ListItemComponent } from '@/components/list-item/list-item.component'
import { SkillComponent } from '@/components/skill/skill.component'

const componentMapper = {
  input: InputComponent,
  textarea: TextAreaComponent,
  button: ButtonComponent,
  select: SelectComponent,
  date: DateComponent,
  radiobutton: RadiobuttonComponent,
  checkbox: CheckboxComponent,
  gridlist: GridListComponent,
  list: ListComponent,
  listitem: ListItemComponent,
  skill: SkillComponent
}
@Directive({
  selector: '[dynamicField]'
})
export class DynamicFieldDirective implements OnInit {
  @Input() field: FieldConfig
  @Input() group?: FormGroup
  componentRef: any
  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {}
  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(
      componentMapper[this.field.type]
    )
    this.componentRef = this.container.createComponent(factory)
    this.componentRef.instance.field = this.field
    if (this.group) this.componentRef.instance.group = this.group
  }
}
