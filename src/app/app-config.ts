import { InjectionToken, ValueProvider } from '@angular/core';



export class AppConfig {
    apiEndpoint: string;
    winServiceEndpoint: string;

}

export const HERO_DI_CONFIG: AppConfig = {
    // apiEndpoint: 'http://danel-db/smart-office-server/api',
    apiEndpoint: 'http://localhost:3000/api',
    winServiceEndpoint: 'http://localhost:8080/api',

};

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export const AppConfigProvider: ValueProvider = { provide: APP_CONFIG, useValue: HERO_DI_CONFIG } 
