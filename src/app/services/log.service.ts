import { Injectable } from '@angular/core';

@Injectable()
export class LogService {

  constructor() { }

  public logError(msg: string): void {
    console.error(msg);
  }

  public logInfo(msg: string): void {
    console.info(msg);
  }
}
