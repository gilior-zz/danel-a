
import { NgModule } from '@angular/core';
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



@NgModule({
  imports: [

  ],
  providers: [requestOptionsProvider,
    InfoService, EnvironmentService,
    LinksService, NewsService,
    UtilityService,
    MdlsService,
    AppConfigProvider,

    FlatEnvironmentService,
    // 
    ]
})
export class CoreModule { }
