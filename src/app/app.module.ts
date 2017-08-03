import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
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
import { UtilityService } from "app/services/utility.service";
import { Router } from "@angular/router";
import { ConfigSettings } from "app/services/config-settings.service";
import { SysAdminComponent } from './sys-admin/sys-admin.component';



@NgModule({
  declarations: [
    AppComponent,
    MnuComponent,
    RollerComponent,
    CurtainComponent,
    DialogWindowComponent,
    CopyComponent,
    SysAdminComponent,

  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    SharedModule,
    CoreModule,
    AppRoutingModule
  ],
  
   

  // providers: [
  //   UtilityService, { provide: APP_INITIALIZER, useFactory: loadContext, deps: [UtilityService], multi: true }
  // ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router, private configSettings: ConfigSettings) {
    // console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}




