import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { ConfigSettings } from "app/services/config-settings.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class DataInterceptor implements HttpInterceptor {
    configSettings: ConfigSettings;
    constructor(private injector: Injector) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.configSettings = this.injector.get(ConfigSettings);
        let userName = this.configSettings != null &&
            this.configSettings.winServiceEndpoint != null &&
            this.configSettings.windowsUserinfo ? this.configSettings.windowsUserinfo.name : '';
       

        
        const authReq = req.clone({ setHeaders: { userName: userName } });
        return next.handle(authReq);
    }
}