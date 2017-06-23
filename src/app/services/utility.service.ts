import { Injectable, Inject } from '@angular/core';
import { SupportIssue, DanelVersionResponse } from "../../models";
import * as Clipboard from "Clipboard";
import { Http, Response } from "@angular/http";
import { APP_CONFIG, AppConfig } from "app/app-config";
import { Observable } from "rxjs/Observable";



@Injectable()
export class UtilityService {
  config: AppConfig
  showContent: boolean;
  showFaqDlg: boolean;
  delRecord: boolean;
  faqToSave: SupportIssue;
  userType: string='support';
  public isManager: boolean;
  constructor(private http: Http, @Inject(APP_CONFIG) config: AppConfig) {
    this.config = Object.assign({}, config)
    this.config.winServiceEndpoint = config.winServiceEndpoint + '/Values/RunFile';
  }

  runFile(file: string): Observable<boolean> {
    // console.log(fp);

    return this.http.post(this.config.winServiceEndpoint, { file })
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
