import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { UtilsComponent } from './utils/utils.component';
import { HomeComponent } from './home/home.component';
import { TabletopComponent } from './tabletop/tabletop.component';
import { TabletopCenterComponent } from './tabletop-center/tabletop-center.component';
import { ToolsComponent } from './tools/tools.component';
import { InitiativeComponent } from './initiative/initiative.component';
import { ChatComponent } from './chat/chat.component';
import { CharacterSheetComponent } from './character-sheet/character-sheet.component';


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
    CharacterSheetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
