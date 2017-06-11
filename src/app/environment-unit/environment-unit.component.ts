import { Component, OnInit, Input } from '@angular/core';
import { DanelVersion } from "../../models";
import { EnvironmentService } from "app/services/environment.service";
import { UtilityService } from "app/services/utility.service";

@Component({
  selector: 'lg-environment-unit',
  templateUrl: './environment-unit.component.html',
  styleUrls: ['./environment-unit.component.scss']
})
export class EnvironmentUnitComponent implements OnInit {
  @Input() danelVersion: DanelVersion
  constructor(private environmentService: EnvironmentService, private us: UtilityService) { }

  showDtataDlg: boolean;
  onCLick() {
    this.showDtataDlg = true;
  }
  public isLoadingFile: boolean;
  copyExeFilePath(id: string) {
    this.isLoadingFile = true;
    this.us.runFile(this.danelVersion.fp).subscribe(i => {
      this.isLoadingFile = false;
    }, err => { this.isLoadingFile = false; })
    this.us.displyCopied(id, this.danelVersion.fp);
  }

  changeWinService() {
    this.winServiceIsChanging = true;
    let toStatus: number = 1 - (+ this.danelVersion.winServiceIsUp);
    this.environmentService.changeService(toStatus, this.danelVersion).subscribe(i => {
      this.danelVersion.winServiceIsUp = i.ver.winServiceIsUp;
      this.winServiceIsChanging = false
    }, err => this.winServiceIsChanging = false)
  }

  changeNotification() {
    this.notificationIsChanging = true;
    let toStatus: number = 1 - (+ this.danelVersion.winNotificationIsUp) + 10;
    this.environmentService.changeService(toStatus, this.danelVersion).subscribe(i => {
      this.danelVersion.winNotificationIsUp = i.ver.winNotificationIsUp;
      this.notificationIsChanging = false
    }, err => this.notificationIsChanging = false)
  }


  restartwinService() {
    let toStatus: number = 2;
    this.environmentService.changeService(toStatus, this.danelVersion).subscribe(i => {
      this.danelVersion.winServiceIsUp = i.ver.winServiceIsUp;
      this.winServiceIsChanging = false
    }, err => this.winServiceIsChanging = false)
  }


  restartNotification() {
    this.notificationIsChanging = true;
    let toStatus: number = 12;
    this.environmentService.changeService(toStatus, this.danelVersion).subscribe(i => {
      this.danelVersion.winNotificationIsUp = i.ver.winNotificationIsUp;
      this.notificationIsChanging = false
    }, err => this.notificationIsChanging = false)
  }

  public winServiceIsChanging: boolean;
  public notificationIsChanging: boolean;

  get isManager(): boolean { return this.us.isManager }

  ngOnInit() {
    this.environmentService.getEnv(this.danelVersion.id).subscribe(i => {
      this.danelVersion.winNotificationIsUp = i.ver.winNotificationIsUp;
      this.danelVersion.winServiceIsUp = i.ver.winServiceIsUp;
    })
  }

}
