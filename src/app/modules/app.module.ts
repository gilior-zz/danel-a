import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import * as $ from 'jquery';
import { AppComponent } from "../app.component";
import { EnvironmentComponent } from "../environment/environment.component";
import { InfoComponent } from "../info/info.component";
import { LinksComponent } from "../links/links.component";
import { MnuComponent } from "../mnu/mnu.component";
import { RollerComponent } from "../roller/roller.component";
import { CurtainComponent } from "../curtain/curtain.component";
import { DialogWindowComponent } from "../dialog-window/dialog-window.component";
import { FaqItemComponent } from "../faq-item/faq-item.component";
import { CoreModule } from "./core.module";
import { SharedModule } from "./shared.module";
@NgModule({
  declarations: [
    AppComponent,
    EnvironmentComponent,
    InfoComponent,
    LinksComponent,
    MnuComponent,
    RollerComponent,
    CurtainComponent,
    DialogWindowComponent,
    FaqItemComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    CoreModule   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }