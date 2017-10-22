import {Component, OnInit} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations'
import {DanelVersionResponse, DanelVersion, Module} from "../../models";
import {EnvironmentService} from "../services/environment.service";
import {Observable} from "rxjs/Observable";
import * as Clipboard from "Clipboard";
import {UtilityService} from "app/services/utility.service";
import {DataService} from "app/services/data.service";
import {EnvAction} from "./env.action";
import {select} from "@angular-redux/store";


@Component({

  templateUrl: 'environment.component.html',
  styleUrls: ['environment.component.scss'],


})


export class EnvironmentComponent implements OnInit {
  // vers: DanelVersion[][];
  @select('filteredVersions') filteredVersions: Observable<DanelVersion[]>;
  allVers: DanelVersion[][];
  lastUpdate: Date;
  danelVersionResponse: Observable<DanelVersionResponse>;
  showDtataDlg: boolean;
  ver: DanelVersion;

  constructor(private ut: UtilityService, private dataService: DataService, private envAction: EnvAction) {
  }

  ngOnInit() {

    // this.dataService.GetData<DanelVersionResponse>('envs').subscribe(i => {
    //   this.lastUpdate = i.time
    //   this.vers = i.vers;
    //   this.allVers = new Array<Array<DanelVersion>>();
    //   Object.assign(this.allVers, this.vers);
    // })

    this.envAction.getEnvs();
    componentHandler.upgradeDom();
  }

  closeDataDlg(status: string) {

  }

  onDoubleCLick(ver: DanelVersion) {

    this.ver = ver;
    this.showDtataDlg = true;

  }

  onMdlIDChanged(mdl: Module) {
    // this.vers = JSON.parse(JSON.stringify(this.allVers));
    // if (mdl == null) return;
    // if (mdl != null) {
    //   this.vers.forEach(i => {
    //     i.forEach(j => {
    //       if (j.lckdMdls == null || !j.lckdMdls.includes(mdl.id)) {
    //         j.isInvisible = true;
    //         // l.push(j);
    //       }
    //     })
    //   })
    // }
    this.envAction.filterEnvs(mdl);
  }


  displyCopied(ele: string, fp: string) {
    this.ut.displyCopied(ele, fp);
  }
}
