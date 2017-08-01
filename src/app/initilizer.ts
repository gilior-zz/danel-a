
import { WindowsUserinfo } from '../models'
import { Http } from '@angular/http';
import { ReflectiveInjector } from "@angular/core";
import { HttpClient } from "@angular/common/http";
export function onInitilize( httpClient: HttpClient): Promise<WindowsUserinfo> {
    // let injector = ReflectiveInjector.resolveAndCreate([Http]);
    // let httpClient = <Http>injector.get(Http);
    // console.log(httpClient);
    console.log('in onInitilize');
    
    return Promise.resolve(null);

}


