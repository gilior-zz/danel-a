import { InjectionToken, ValueProvider } from '@angular/core';



export class AppConfig {
    apiEndpoint: string;
    winServiceEndpoint: string;

}

export const APP_DI_CONFIG: AppConfig = {
    // apiEndpoint: 'api',
    apiEndpoint: 'http://localhost:3000/api',
    winServiceEndpoint: 'http://localhost:8080/api',

};

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export const AppConfigProvider: ValueProvider = { provide: APP_CONFIG, useValue: APP_DI_CONFIG } 
