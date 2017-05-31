import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { DanelVersionResponse } from "../../models";
import { EnvironmentService } from "../services/environment.service";
import { Observable } from "rxjs/Observable";
import * as Clipboard from "Clipboard";

@Component({
  selector: 'lg-environment',
  templateUrl: 'environment.component.html',
  styleUrls: ['environment.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateY(0)' })),
      transition('void => *', [
        style({ transform: 'translateY(100%)' }),
        animate(500)
      ]),
      transition('* => void', [
        animate(500, style({ transform: 'translateY(100%)' }))
      ])
    ])
  ]

})
export class EnvironmentComponent implements OnInit {
  danelVersionResponse: Observable<DanelVersionResponse>;
  constructor(private environmentService: EnvironmentService) { }

  ngOnInit() {
    this.danelVersionResponse = this.environmentService.getEnvs();
  }

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
