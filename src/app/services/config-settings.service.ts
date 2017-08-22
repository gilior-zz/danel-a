import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import { UtilityService } from "app/services/utility.service";
import { AppConfig, VersionResponse, WindowsUserinfo } from "models";
import { LogService } from "app/services/log.service";

@Injectable()
export class ConfigSettings {
  winServiceEndpoint: VersionResponse;
  windowsUserinfo: WindowsUserinfo;

  utilityService: UtilityService
  get appConfig(): AppConfig { return this._appConfig; }

  set appConfig(val: AppConfig) { this._appConfig = val; }

  _appConfig: AppConfig;
  constructor(private http: HttpClient, private logService: LogService, private injector: Injector) {

  }

  // This is the method you want to call at bootstrap
  // Important: It should return a Promise
  async load(): Promise<any> {
    // this.logService.logInfo('in StartUpService in load')
    //option 1
    // return this.http.get("settings.json").toPromise().then(i => console.log(i));

    //option 2
    // console.log(`in load `);
    // this._startupData = null;
    // return Observable.of(1).delay(20000).do(val => {
    //   this._startupData = null;
    //   console.log(`post load `);
    // }).toPromise();

    //option 3
    // return this.http
    //   .get('settings.json')
    //   .map((res: Response) => res.json()).delay(5000)
    //   .toPromise()
    //   .then((data: any) => this._startupData = data)
    //   .catch((err: any) => Promise.resolve());


    //option 4    
    // return this.http.get("settings.json").toPromise().then(i => {
    //   this.appConfig = <AppConfig>i;
    //   // this.utilityService._config = <AppConfig>i;   
    //   let endPoint = this.appConfig.winServiceEndpoint + "/" + 'Values' + '/' + 'GetVersion';
    //   this.http.get(endPoint).toPromise().then(i => {
    //     this.logService.logInfo(i);
    //   }).then(() => {
    //     this.logService.logInfo('in StartUpService in post load')
    //     this.logService.logInfo(i)
    //   })
    // }
    // )

    //option good   
    await this.http.get("settings.json").toPromise().then(i => {
      this.appConfig = <AppConfig>i;
      // this.logService.logInfo('in StartUpService in post load')
      this.logService.logInfo(i)
    }).catch((err: any) => {
      this.logService.logInfo(err);
      Promise.resolve()
    });


    let endPoint = this.appConfig.winServiceEndpoint + "/" + 'Values' + '/' + 'GetVersion';


    await this.http.get<VersionResponse>(endPoint).toPromise().then((i) => {
      this.winServiceEndpoint = <VersionResponse>i;
    }
    )
      .catch((err: any) => {
        this.logService.logInfo(err);
        Promise.resolve()
      });


      endPoint = this.appConfig.winServiceEndpoint + "/" + 'Values' + '/' + 'GetUserEnv';
    return this.http.get<WindowsUserinfo>(endPoint).toPromise().then((i) => {
      this.windowsUserinfo = <WindowsUserinfo>i;
      this.logService.logInfo(this.windowsUserinfo);
    }
    )
      .catch((err: any) => {
        this.logService.logInfo(err);
        Promise.resolve()
      });



    //option 5
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     this.http.get("settings.json").toPromise().then(i => {

    //       let _config = <_AppConfig>i;
    //       console.log('post load:')
    //       console.log(_config)
    //       this.utilityService._config = _config;
    //     })
    //     resolve();
    //   }, 3000); // Wait 3s then resolve.
    // });
  }

  get hasWinServiceEndpoint(): boolean {
    return this.winServiceEndpoint != null;
  }

  get hasWinServiceLatestVersion(): boolean {
    return this.winServiceEndpoint != null && this.winServiceEndpoint.version == this.appConfig.latestWinServiceVersion;
  }



}