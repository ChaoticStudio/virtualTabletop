import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { TokenInterceptorService } from './token-interceptor.service';
import { AreaOfEffectComponent } from './area-of-effect/area-of-effect.component';
import { SheetBuilderComponent } from './sheet-builder/sheet-builder.component';

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
    SheetBuilderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
