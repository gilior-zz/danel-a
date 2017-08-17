import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { ConfigSettings } from "app/services/config-settings.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class DataInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   const authReq = req.clone({setHeaders: {userName: "this.configSettings.windowsUserinfo.name"}});
    return next.handle(authReq);
  }
}