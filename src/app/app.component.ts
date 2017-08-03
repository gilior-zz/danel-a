import { Component } from '@angular/core';
import { UtilityService } from "app/services/utility.service";

import { LogService } from "app/services/log.service";
import { ConfigSettings } from "app/services/config-settings.service";

@Component({
  selector: 'lg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lg works!';

  /**
   *
   */
  constructor(private logService: LogService, private configSettings: ConfigSettings, private us: UtilityService) {


  }

  get showSysAdminPage(): boolean {
    return !(this.configSettings.hasWinServiceEndpoint && this.configSettings.hasWinServiceLatestVersion)
  }

  ngOnInit() {
    // If there is no startup data received (maybe an error!)
    // navigate to error route
    // this.logService.logInfo('in AppComponent ngOnInit')
    // this.logService.logInfo(this.configSettings.appConfig);;

  }

  get isExplorer(): boolean { return this.us.isExplorer }
  // get isExplorer(): boolean { return false; }
}
