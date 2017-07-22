import { Component, OnInit, Input } from '@angular/core';
import { DanelVersion, CustomServiceControllerStatus } from "../../models";
import { EnvironmentService } from "app/services/environment.service";
import { UtilityService } from "app/services/utility.service";
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";

@Component({
  selector: 'lg-environment-unit',
  templateUrl: './environment-unit.component.html',
  styleUrls: ['./environment-unit.component.scss']
})
export class EnvironmentUnitComponent implements OnInit {
  @Input() danelVersion: DanelVersion
  constructor(private environmentService: EnvironmentService, private us: UtilityService, public domSanitizer: DomSanitizer) { }

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
    let currentStatus = this.danelVersion.winListenerStatus;
    this.danelVersion.winServiceIsUp =
      this.danelVersion.winListenerStatus == CustomServiceControllerStatus.Running
    let toStatus: number = 1 - (+ this.danelVersion.winServiceIsUp);

    this.danelVersion.winListenerStatus = CustomServiceControllerStatus.StartPending;
    this.environmentService.changeService(toStatus, this.danelVersion).subscribe(i => {
      this.danelVersion.winListenerStatus = i.ver.winListenerStatus;
      
    }, err => {
      this.danelVersion.winListenerStatus = currentStatus;
      //this.winServiceIsChanging = false
    })
  }

  get fileRunnerIsDown(): boolean { return !this.us.fileRunnerIsUp }

  changeNotification() {
    let currentStatus = this.danelVersion.winNotificationStatus;
    //this.notificationIsChanging = true;
    this.danelVersion.winNotificationIsUp =
      this.danelVersion.winNotificationStatus == CustomServiceControllerStatus.Running
    let toStatus: number = 1 - (+ this.danelVersion.winNotificationIsUp) + 10;
    this.danelVersion.winNotificationStatus = CustomServiceControllerStatus.StartPending;
    this.environmentService.changeService(toStatus, this.danelVersion).subscribe(i => {
      this.danelVersion.winNotificationStatus = i.ver.winNotificationStatus;
      //this.notificationIsChanging = false
    }, err => {
      this.danelVersion.winNotificationStatus = currentStatus;
      //this.notificationIsChanging = false
    })
  }


  restartwinService() {
    let currentStatus = this.danelVersion.winListenerStatus;
    //this.winServiceIsChanging = true;
    let toStatus: number = 2;
    this.danelVersion.winListenerStatus = CustomServiceControllerStatus.StartPending;
    this.environmentService.changeService(toStatus, this.danelVersion).subscribe(i => {
     // this.winServiceIsChanging = false;
      this.danelVersion.winListenerStatus = i.ver.winListenerStatus;
      this
    }, err => {
      this.danelVersion.winListenerStatus = currentStatus;
      //this.winServiceIsChanging = false
    })
  }

  get btnServiceText(): string {
    let str: string = 'ממתין';
    switch (this.danelVersion.winListenerStatus) {
      case CustomServiceControllerStatus.Running: str = 'עצירה'; break;
      case CustomServiceControllerStatus.Stopped: str = 'הפעלה'; break;
      case CustomServiceControllerStatus.NotExists: str = 'לא ניתן'; break;
    }
    return str;
  }

  get btnNotificationText(): string {
    let str: string = 'ממתין';
    switch (this.danelVersion.winNotificationStatus) {
      case CustomServiceControllerStatus.Running: str = 'עצירה'; break;
      case CustomServiceControllerStatus.Stopped: str = 'הפעלה'; break;
      case CustomServiceControllerStatus.NotExists: str = 'לא ניתן'; break;
    }
    return str;
  }

  get changeWinServiceNotAllowed(): boolean {
    return !(this.danelVersion.winListenerStatus == CustomServiceControllerStatus.Running
      ||
      this.danelVersion.winListenerStatus == CustomServiceControllerStatus.Stopped);
  }

  get changeNotificationNotAllowed(): boolean {
    return !(this.danelVersion.winNotificationStatus == CustomServiceControllerStatus.Running
      ||
      this.danelVersion.winNotificationStatus == CustomServiceControllerStatus.Stopped);
  }

  get restartServiceNotAllowed(): boolean {
    return this.danelVersion.winListenerStatus != CustomServiceControllerStatus.Running;
  }

  get restartNotificationNotAllowed(): boolean {
    return this.danelVersion.winNotificationStatus != CustomServiceControllerStatus.Running;
  }





  get styleByStatus(): SafeStyle {
    let borderColor: string = 'orange';
    let color: string = 'orange';

    if (this.danelVersion.winListenerStatus == CustomServiceControllerStatus.Running) borderColor = 'greenyellow'
    else if (this.danelVersion.winListenerStatus == CustomServiceControllerStatus.Stopped) borderColor = 'darkred'
    else if (this.danelVersion.winListenerStatus == CustomServiceControllerStatus.NotExists) borderColor = 'black'
    if (this.danelVersion.winNotificationStatus == CustomServiceControllerStatus.Running) color = 'greenyellow'
    else if (this.danelVersion.winNotificationStatus == CustomServiceControllerStatus.Stopped) color = 'darkred'
    else if (this.danelVersion.winNotificationStatus == CustomServiceControllerStatus.NotExists) color = 'black'

    let safeStyle = this.domSanitizer.bypassSecurityTrustStyle(`border-color: ${borderColor}; color:${color}`)
    // if (color != 'orange') console.log(this.danelVersion);
    return safeStyle;
  }


  restartNotification() {
    let currentStatus = this.danelVersion.winNotificationStatus;
    //this.notificationIsChanging = true;
    let toStatus: number = 12;
    this.danelVersion.winNotificationStatus = CustomServiceControllerStatus.StartPending;
    this.environmentService.changeService(toStatus, this.danelVersion).subscribe(i => {
      //this.notificationIsChanging = false;
     // this.danelVersion.winNotificationStatus = i.ver.winNotificationStatus;

    }, err => {
      this.danelVersion.winNotificationStatus = currentStatus;
     // this.notificationIsChanging = false
    })
  }

  //public winServiceIsChanging: boolean;
 // public notificationIsChanging: boolean;

  get isManager(): boolean { return this.us.isManager }

  ngOnInit() {
    this.environmentService.getEnv(this.danelVersion.id).subscribe(i => {
      // this.danelVersion.winNotificationIsUp = i.ver.winNotificationIsUp;
      // this.danelVersion.winServiceIsUp = i.ver.winServiceIsUp;
      this.danelVersion = i.ver;
    })
  }

}
