import { NgModule, APP_INITIALIZER } from '@angular/core';
import { requestOptionsProvider } from "app/services/default-request-options.service";
import { InfoService } from "app/services/info.service";
import { EnvironmentService } from "app/services/environment.service";
import { NewsService } from "app/services/news.service";
import { UtilityService } from "app/services/utility.service";
import { MdlsService } from "app/services/mdls.service";
import { LinksService } from "app/services/links.service";
import { AppConfigProvider } from "app/app-config";
import { RTL } from "@progress/kendo-angular-l10n";
import { FlatEnvironmentService } from "app/services/flat-environment.service";
import { LogService } from "app/services/log.service";
import { DataService } from "app/services/data.service";
import { ConfigSettings } from "app/services/config-settings.service";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DataInterceptor } from "app/services/DataInterceptor";
import {EnvAction} from "./environment/env.action";

export function startupServiceFactory(startupService: ConfigSettings): Function {
  return () => startupService.load();
}

@NgModule({
  imports: [

  ],
  providers: [
    LogService,
    UtilityService,
    EnvAction,
    ConfigSettings,
    {
      provide: APP_INITIALIZER,
      useFactory: startupServiceFactory,
      deps: [ConfigSettings],
      multi: true
    },
    requestOptionsProvider,
    // InfoService,
    // EnvironmentService,
    // LinksService,
    // NewsService,

    // MdlsService,
    AppConfigProvider,
    // FlatEnvironmentService,
    DataService
    ,    {      provide: HTTP_INTERCEPTORS,
      useClass: DataInterceptor,
      multi: true,
    }

    //
  ]
})
export class CoreModule { }
