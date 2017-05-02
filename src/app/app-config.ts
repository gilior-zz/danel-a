import { InjectionToken, ValueProvider } from '@angular/core';



export class AppConfig {
    apiEndpoint: string;

}

export const HERO_DI_CONFIG: AppConfig = {
    apiEndpoint: 'http://localhost:3000/api',

};

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export const AppConfigProvider: ValueProvider = { provide: APP_CONFIG, useValue: HERO_DI_CONFIG } 
