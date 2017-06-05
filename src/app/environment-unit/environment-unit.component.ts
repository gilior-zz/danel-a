import { Component, OnInit, Input } from '@angular/core';
import { DanelVersion } from "../../models";
import { EnvironmentService } from "app/services/environment.service";

@Component({
  selector: 'lg-environment-unit',
  templateUrl: './environment-unit.component.html',
  styleUrls: ['./environment-unit.component.scss']
})
export class EnvironmentUnitComponent implements OnInit {
  @Input() danelVersion: DanelVersion
  constructor(private environmentService: EnvironmentService) { }

  ngOnInit() {
this.environmentService.getEnv(this.danelVersion.id).subscribe(i=>{
  this.danelVersion.winNotificationIsUp=i.ver.winNotificationIsUp;
  this.danelVersion.winServiceIsUp=i.ver.winNotificationIsUp;
})
  }

}
