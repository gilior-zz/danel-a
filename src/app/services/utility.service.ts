import { Injectable } from '@angular/core';
import { SupportIssue } from "../../models";



@Injectable()
export class UtilityService {
  showContent:boolean;
  showFaqDlg: boolean;
  delRecord: boolean;
  faqToSave: SupportIssue;
  constructor() { }
  tick_then(fn: () => any) { setTimeout(fn, 0); }
}
