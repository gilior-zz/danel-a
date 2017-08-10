import { Component, OnInit } from '@angular/core';
import { ConfigSettings } from "app/services/config-settings.service";

@Component({
  selector: 'lg-sys-admin',
  templateUrl: './sys-admin.component.html',
  styleUrls: ['./sys-admin.component.scss']
})
export class SysAdminComponent implements OnInit {
  get showNoWinServiceEndpoint(): boolean {
    return (!this.configSettings.hasWinServiceEndpoint)
  }

  get showNotWinServiceLatestVersion(): boolean {
    return (this.configSettings.hasWinServiceEndpoint && !this.configSettings.hasWinServiceLatestVersion)
  }



  constructor(private configSettings: ConfigSettings) { }

  ngOnInit() {
  }

}
