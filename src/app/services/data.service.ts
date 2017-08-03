import { Injectable, Inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { HttpErrorResponse, HttpResponse, HttpEventType } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { APP_CONFIG, AppConfig } from "app/app-config";
import { UtilityService } from "app/services/utility.service";
import { LogService } from "app/services/log.service";
import { ConfigSettings } from "app/services/config-settings.service";

@Injectable()
export class DataService {
  logDataService: boolean = false;

  constructor(private http: HttpClient, private ut: UtilityService, private logService: LogService, private configSettings: ConfigSettings) {


  }

  get apiEndpoint(): string {
    return this.configSettings.appConfig.isDevMode ?
      this.configSettings.appConfig.devApiEndpoint :
      this.configSettings.appConfig.prodApiEndpoint;
  }

  public GetData<T>(url: string, id?: string, headres?: HttpHeaders): Observable<T> {
    let response: Observable<T>;
    response = Observable.empty();
    let endPoint = this.apiEndpoint + "/" + url + (id !== undefined ? '/' + id : '');
    let get = this.http.get<T>(endPoint, {
      observe: 'response',
      headers: headres,
    })
    let retries = get.retry(3);
    response = retries.flatMap(resp => {
      if (this.logDataService) this.logService.logInfo('finished GetData');
      return Observable.of(resp.body)
    })
    return response;
  }

  public PostData<T>(url: string, body: T, headres?: HttpHeaders): Observable<T> {
    let response: Observable<T>;
    response = Observable.empty();
    let endPoint = this.apiEndpoint + "/" + url;
    let post = this.http.post(endPoint, body, {
      observe: 'response',
      headers: headres,
    })
    let retries = post.retry(3);
    response = retries.flatMap(resp => {
      if (this.logDataService) this.logService.logInfo('finished PostData');
      return Observable.of(<T>resp.body)
    })
    return response;
  }

  public PutData<RespType, BodyType>(url: string, id: number, body: BodyType, headres?: HttpHeaders): Observable<RespType> {
    let response: Observable<RespType>;
    response = Observable.empty();
    let endPoint = this.apiEndpoint + "/" + url + '/' + id;
    let post = this.http.put(endPoint, body, {
      observe: 'response',
      headers: headres,
    })
    let retries = post.retry(3);
    response = retries.flatMap(resp => {
      if (this.logDataService) this.logService.logInfo('finished PutData');
      return Observable.of(<RespType>resp.body)
    })
    return response;
  }

  public RemoveData<T>(url: string, id: number, headres?: HttpHeaders): Observable<T> {
    let response: Observable<T>;
    response = Observable.empty();
    let endPoint = this.apiEndpoint + "/" + url + '/' + id;
    let del = this.http.delete(endPoint, {
      observe: 'response',
      headers: headres,
    })
    let retries = del.retry(3);
    response = retries.flatMap(resp => {
      if (this.logDataService) this.logService.logInfo('finished PutData');
      return Observable.of(<T>resp.body)
    })
    return response;
  }







}
