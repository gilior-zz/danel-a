import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/observable'
import 'rxjs/add/observable/of';
import * as  _ from 'lodash'
import { AppConfig, APP_CONFIG } from "../app-config";
import { Response, Http } from "@angular/http";
import { DanelVersionResponse, DanelVersion, ServiceControllerStatus } from "../../models";


@Injectable()
export class FlatEnvironmentService {
    config: AppConfig
    listenerConfig: AppConfig
    notificationConfig: AppConfig
    flatConfig: AppConfig

    plug: number = 6;
    constructor(private http: Http, @Inject(APP_CONFIG) config: AppConfig) {
        this.config = Object.assign({}, config);
        this.listenerConfig = Object.assign({}, config);
        this.notificationConfig = Object.assign({}, config);
        this.flatConfig = Object.assign({}, config);
        this.config.apiEndpoint = config.apiEndpoint + '/envs';
        this.listenerConfig.apiEndpoint = config.apiEndpoint + '/listener';
        this.notificationConfig.apiEndpoint = config.apiEndpoint + '/notification';
        this.flatConfig.apiEndpoint = config.apiEndpoint + '/flatEnvs';

    }

    GetListenersStatuses(): Observable<Array<any>> {
        return this.http.get(this.listenerConfig.apiEndpoint)
            .map(this.extractData)
            .catch(this.handleError);
    }

    GetNotificationsStatuses(): Observable<Array<any>> {

        return this.http.get(this.notificationConfig.apiEndpoint)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public chnageWinListenerStatus(id: number, toStatus: ServiceControllerStatus): Observable<any> {
        return this.http.put(`${this.listenerConfig.apiEndpoint}/${id}`, toStatus)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public chnageWinNotificationStatus(id: number, toStatus: ServiceControllerStatus): Observable<ServiceControllerStatus> {
        return this.http.put(`${this.notificationConfig.apiEndpoint}/${id}`, toStatus)
            .map(this.extractData)
            .catch(this.handleError);
    }


    getEnvs(): Observable<DanelVersionResponse> {
        return this.http.get(this.flatConfig.apiEndpoint)
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
