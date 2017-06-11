import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from "./core.module";
import { SharedModule } from "./shared.module";
import { AppComponent } from "app/app.component";


import { RollerComponent } from "app/roller/roller.component";
import { CurtainComponent } from "app/curtain/curtain.component";
import { DialogWindowComponent } from "app/dialog-window/dialog-window.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from "app/app-routing.module";
import { CopyComponent } from "app/copy/copy.component";
import { MnuComponent } from "app/mnu/mnu.component";

@NgModule({
  declarations: [
    AppComponent,
    MnuComponent,
    RollerComponent,
    CurtainComponent,
    DialogWindowComponent,
    CopyComponent
  ],
  imports: [
BrowserAnimationsModule,
    BrowserModule,
    SharedModule,
    CoreModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }