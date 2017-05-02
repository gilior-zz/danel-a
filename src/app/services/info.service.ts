import { Observable } from 'rxjs/Observable';
import { Injectable, Inject } from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';


import { Http, Response } from "@angular/http";

import { AppConfig, APP_CONFIG } from "../app-config";
import { SupportIssueResponse, SupportIssue } from "../../models";
@Injectable()
export class InfoService {
  // url='http://localhost:20158/api/Values/GetSIS';
  config: AppConfig
  plug: number = 6;
  constructor(private http: Http, @Inject(APP_CONFIG) config: AppConfig) {
    this.config = config;
    this.config.apiEndpoint = config.apiEndpoint + '/faq';
  }

  getFaQs(): Observable<SupportIssueResponse> {
    return this.http.get(this.config.apiEndpoint)
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


  add(si: SupportIssue): Observable<SupportIssueResponse> {
    return this.http.post(this.config.apiEndpoint, si)
      .map((res: Response) => {
        const data = res.json();
        return data;
      })
      .catch(this.handleError);
  }

  update(si: SupportIssue) {
    return this.http.put(`${this.config.apiEndpoint}/${si.id}`, si)
      .map((res: Response) => {
        const data = res.json();
        return data;
      })
      .catch(this.handleError);
  }

  remove(dataItem: SupportIssue) {
    return this.http.delete(`${this.config.apiEndpoint}/${dataItem.id}`);
  }
}
