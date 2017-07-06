import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { DanelVersionResponse, DanelVersion, Module } from "../../models";
import { EnvironmentService } from "../services/environment.service";
import { Observable } from "rxjs/Observable";
import * as Clipboard from "Clipboard";
import { UtilityService } from "app/services/utility.service";

@Component({

  templateUrl: 'environment.component.html',
  styleUrls: ['environment.component.scss'],


})


export class EnvironmentComponent implements OnInit {
  vers: DanelVersion[][];
  allVers: DanelVersion[][];

  danelVersionResponse: Observable<DanelVersionResponse>;
  constructor(private environmentService: EnvironmentService, private ut: UtilityService) { }

  ngOnInit() {
    this.environmentService.getEnvs().subscribe(i => {
      this.vers = i.vers;
      this.allVers = new Array<Array<DanelVersion>>();
      Object.assign(this.allVers, this.vers);


    })
  }
  showDtataDlg: boolean;
  closeDataDlg(status: string) {

  }

  ver: DanelVersion;
  onDoubleCLick(ver: DanelVersion) {

    this.ver = ver;
    this.showDtataDlg = true;

  }

  onMdlIDChanged(mdl: Module) {
    // Object.assign(this.vers, this.allVers);
    this.vers = JSON.parse(JSON.stringify(this.allVers));
    // console.log('vers ' + this.vers[0][1].isInvisible);
    // console.log('allVers ' + this.allVers[0][1].isInvisible);
    // let l = [];
    // Object.assign(this.vers, this.allVers);
    // console.log(this.vers);
    // console.log(this.allVers);

    // this.vers.forEach(i => {
    //   i.forEach(j => {

    //       j.isInvisible = false;;




    //   })
    // })
    if (mdl == null) return;
    if (mdl != null) {
      this.vers.forEach(i => {
        i.forEach(j => {
          if (j.lckdMdls == null || !j.lckdMdls.includes(mdl.id)) {
            j.isInvisible = true;
            // l.push(j);
          }


        })
      })
      // this.vers = null;

    }


    //   this.filteredVers = this.filteredVers.filter(i => i[0] != null && i.lckdMdls.includes(mdl.id));
    // this.updateState();



  }




  displyCopied(ele: string, fp: string) {
    this.ut.displyCopied(ele, fp);
  }



}
