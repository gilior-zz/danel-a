import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/observable'
import 'rxjs/add/observable/of';
import * as  _ from 'lodash'
import { AppConfig, APP_CONFIG } from "../app-config";
import { Response, Http } from "@angular/http";
import { DanelVersionResponse, DanelVersion } from "../../models";


@Injectable()
export class FlatEnvironmentService {
    config: AppConfig
    plug: number = 6;
    constructor(private http: Http, @Inject(APP_CONFIG) config: AppConfig) {
        this.config = Object.assign({}, config);
        this.config.apiEndpoint = config.apiEndpoint + '/flatEnvs';
    }


    getEnvs(): Observable<DanelVersionResponse> {
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
