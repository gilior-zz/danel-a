import { Injectable } from '@angular/core';
import { SupportIssue } from "../../models";
import * as Clipboard from "Clipboard";



@Injectable()
export class UtilityService {
  showContent: boolean;
  showFaqDlg: boolean;
  delRecord: boolean;
  faqToSave: SupportIssue;
  constructor() { }
  tick_then(fn: () => any) { setTimeout(fn, 0); }

  showCopied: boolean;

  displyCopied(ele: string, fp: string) {
    // console.log(fp); 


    let l = new Clipboard(`#${ele}`, {
      text: () => { return fp; }
    });
    l.on('success', () => {
      console.log('copied');
      l.on('errorsuccess', () => {
        console.log('not  copied');
      });
    });
    console.log(l);

    this.showCopied = true;
    setTimeout(() => {


      this.showCopied = false;
    }, 1000);
  }
}
