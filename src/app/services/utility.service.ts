import { Injectable, Inject } from '@angular/core';
import { SupportIssue, DanelVersionResponse, WindowsUserinfo, AppConfig } from "../../models";
import * as Clipboard from "Clipboard";
import { Http, Response } from "@angular/http";
// import { APP_CONFIG, AppConfig } from "app/app-config";
import { Observable } from "rxjs/Observable";
import { ConfigSettings } from "../services/config-settings.service";






@Injectable()
export class UtilityService { 
   config: AppConfig;
  showContent: boolean;
  showFaqDlg: boolean;
  delRecord: boolean;
  faqToSave: SupportIssue;
  userType: string = 'support';
  public isManager: boolean;
  windowsUserinfo: WindowsUserinfo
  fileRunnerIsUp: boolean = true;
  isExplorer: boolean;
  constructor(private http: Http, private configSettings: ConfigSettings) {
    // this.config = Object.assign({}, config)
    // this.config.winServiceEndpoint = config.winServiceEndpoint;
    this.checkWinServiceEndpoint();
    this.getWindowsUserinfo();
    this.checkBrowser()
    // this.mycheckBrowser();
  }

  getWindowsUserinfo() {
    if (this.fileRunnerIsUp) {
      let url = `${this.configSettings.appConfig.winServiceEndpoint}/Values/GetUserEnv`;
      this.http.get(url).subscribe((i) => {
        this.windowsUserinfo = i.json();
      })
    }
  }

  private checkBrowser() {
    {
      // console.log(navigator.userAgent);

      // var ua = navigator.userAgent, tem,
      //   M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
      // if (/trident/i.test(M[1])) {
      //   tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      //   return 'IE ' + (tem[1] || '');
      // }
      // if (M[1] === 'Chrome') {
      //   tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
      //   if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
      // }
      // M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
      // if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);



      // let l = M.join(' ');
      // let ll = (M[0]);
      // let isExplorer = ll.toLowerCase().includes('msie')

      this.isExplorer = navigator.userAgent.toLowerCase().indexOf('trident') != -1 || navigator.userAgent.toLowerCase().indexOf('msie') != -1
      // return l;
    }
  }



  checkWinServiceEndpoint() {
    this.http.get(this.configSettings.appConfig.winServiceEndpoint + `/Values/RunFile`)
      .subscribe(
      i => {

        this.fileRunnerIsUp = true;
      }, (err: any) => {

        this.fileRunnerIsUp = (err && err.status == 405)

      }
      )
  }



  runFile(file: string): Observable<boolean> {
    // console.log(fp);

    return this.http.post(this.configSettings.appConfig.winServiceEndpoint + `/Values/RunFile`, { file })
      .map(this.extractData)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Promise.reject(errMsg);
  }

  tick_then(fn: () => any) { setTimeout(fn, 0); }

  showCopied: boolean;

  displyCopied(ele: string, fp: string) {
    // console.log(fp); 


    let l = new Clipboard(`#${ele}`, {
      text: () => { return fp; }
    });
    l.on('success', () => {
      console.log('copied');
      l.on('errorsuccess', () => {
        console.log('not  copied');
      });
    });
    // console.log(l);

    this.showCopied = true;
    setTimeout(() => {


      this.showCopied = false;
    }, 1000);
  }
}
