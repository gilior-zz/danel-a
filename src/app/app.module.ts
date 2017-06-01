import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import * as $ from 'jquery';
// import { AppComponent } from "../app.component";

import { CoreModule } from "./core.module";
import { SharedModule } from "./shared.module";
import { AppComponent } from "app/app.component";
import { EnvironmentComponent } from "app/environment/environment.component";
import { InfoComponent } from "app/info/info.component";
import { LinksComponent } from "app/links/links.component";
import { MnuComponent } from "app/mnu/mnu.component";
import { RollerComponent } from "app/roller/roller.component";
import { CurtainComponent } from "app/curtain/curtain.component";
import { DialogWindowComponent } from "app/dialog-window/dialog-window.component";
import { FaqItemComponent } from "app/faq-item/faq-item.component";
import { CopyComponent } from './copy/copy.component';
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
    FaqItemComponent,
    CopyComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    CoreModule   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }