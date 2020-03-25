import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './material.module'

import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component'
import { UtilsComponent } from './utils/utils.component'
import { HomeComponent } from './home/home.component'
import { TabletopComponent } from './tabletop/tabletop.component'
import { TabletopCenterComponent } from './tabletop-center/tabletop-center.component'
import { ToolsComponent } from './tools/tools.component'
import { InitiativeComponent } from './initiative/initiative.component'
import { ChatComponent } from './chat/chat.component'
import { CharacterSheetComponent } from './character-sheet/character-sheet.component'
import { RegisterComponent } from './register/register.component'
import { LoginComponent } from './login/login.component'
import { TokenInterceptorService } from './token-interceptor.service'
import { AreaOfEffectComponent } from './area-of-effect/area-of-effect.component'
import { SheetBuilderComponent } from './sheet-builder/sheet-builder.component'
import { InputComponent } from './components/common/input/input.component'
import { ButtonComponent } from './components/common/button/button.component'
import { SelectComponent } from './components/common/select/select.component'
import { DateComponent } from './components/common/date/date.component'
import { RadioButtonComponent } from './components/common/radiobutton/radiobutton.component'
import { CheckboxComponent } from './components/common/checkbox/checkbox.component'
import { DynamicFieldDirective } from './components/common/dynamic-field/dynamic-field.directive'
import { DynamicFormComponent } from './components/common/dynamic-form/dynamic-form.component'
import { GridListComponent } from './components/common/grid-list/grid-list.component'
import { ListComponent } from './components/common/list/list.component'
import { ListItemComponent } from './components/common/list-item/list-item.component'
import { SkillComponent } from './components/common/skill/skill.component';
import { TextAreaComponent } from './components/common/text-area/text-area.component'
import { InputOptionsMenuComponent } from './sheet-builder/input-options-menu/input-options-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    UtilsComponent,
    HomeComponent,
    TabletopComponent,
    TabletopCenterComponent,
    ToolsComponent,
    InitiativeComponent,
    ChatComponent,
    CharacterSheetComponent,
    RegisterComponent,
    LoginComponent,
    AreaOfEffectComponent,
    SheetBuilderComponent,
    InputComponent,
    ButtonComponent,
    SelectComponent,
    DateComponent,
    RadioButtonComponent,
    CheckboxComponent,
    DynamicFieldDirective,
    DynamicFormComponent,
    GridListComponent,
    ListComponent,
    ListItemComponent,
    SkillComponent,
    InputOptionsMenuComponent,
    TextAreaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    InputComponent,
    ButtonComponent,
    SelectComponent,
    DateComponent,
    RadioButtonComponent,
    CheckboxComponent,
    GridListComponent,
    ListComponent,
    ListItemComponent,
    SkillComponent,
    TextAreaComponent
  ]
})
export class AppModule {}
