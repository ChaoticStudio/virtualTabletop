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


@NgModule({
  declarations: [
    AppComponent,
    UtilsComponent,
    HomeComponent,
    TabletopComponent,
    TabletopCenterComponent,
    ToolsComponent
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
