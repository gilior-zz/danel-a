import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { DanelVersionResponse } from "../../models";
import { EnvironmentService } from "../services/environment.service";
import { Observable } from "rxjs/Observable";
import * as Clipboard from "Clipboard";
import { UtilityService } from "app/services/utility.service";

@Component({
  selector: 'lg-environment',
  templateUrl: 'environment.component.html',
  styleUrls: ['environment.component.scss'],


})
export class EnvironmentComponent implements OnInit {
  danelVersionResponse: Observable<DanelVersionResponse>;
  constructor(private environmentService: EnvironmentService, private ut: UtilityService) { }

  ngOnInit() {
    this.danelVersionResponse = this.environmentService.getEnvs();
  }



  displyCopied(ele: string, fp: string) {
    this.ut.displyCopied(ele, fp);
  }



}
