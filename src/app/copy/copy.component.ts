import { Component, OnInit, trigger, state, transition, style, animate } from '@angular/core';
import { UtilityService } from "app/services/utility.service";

@Component({
  selector: 'lg-copy',
  templateUrl: './copy.component.html',
  styleUrls: ['./copy.component.scss'],
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
export class CopyComponent implements OnInit {

  constructor(private ut:UtilityService) { }

  get showCopied():boolean{return this.ut.showCopied}

  ngOnInit() {
  }

}
