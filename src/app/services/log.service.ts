import { Injectable } from '@angular/core';

@Injectable()
export class LogService {

  constructor() { }

  public logError(msg: string): void {
    console.error(`${msg} ${new Date().toLocaleTimeString()}`);
  }

  public logInfo(msg: Object): void {
    console.info(`${JSON.stringify(msg)} ${new Date().toLocaleTimeString()}`);
  }
}
