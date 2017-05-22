
import { NgModule } from '@angular/core';
import { requestOptionsProvider } from "../services/default-request-options.service";
import { InfoService } from "../services/info.service";
import { EnvironmentService } from "../services/environment.service";
import { LinksService } from "../services/links.service";
import { NewsService } from "../services/news.service";
import { UtilityService } from "../services/utility.service";
import { MdlsService } from "../services/mdls.service";
import { RTL } from '@progress/kendo-angular-l10n';

import { AppConfigProvider } from "../app-config";


@NgModule({
  imports: [
  
  ],
  providers: [requestOptionsProvider,
    InfoService, EnvironmentService,
     LinksService, NewsService, 
     UtilityService, 
     MdlsService,
     AppConfigProvider,{ provide: RTL, useValue: true }]
})
export class CoreModule { }
