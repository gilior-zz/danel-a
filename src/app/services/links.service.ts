import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/observable'

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as  _ from 'lodash';

import { Response, Http } from "@angular/http";
import { LinkResponse } from "../../models";
import { APP_CONFIG, AppConfig } from "../app-config";

@Injectable()
export class LinksService {
  config: any;
  // url='http://localhost:20158/api/Values/GetLnks';

  plug: number = 15;

  constructor(private http: Http, @Inject(APP_CONFIG) config: AppConfig) {
    this.config = Object.assign({}, config);
    this.config.apiEndpoint = config.apiEndpoint + '/lnks';
  }

  getLinks(): Observable<LinkResponse> {
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
}
