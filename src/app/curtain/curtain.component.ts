import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { UtilityService } from "../services/utility.service";

@Component({
  selector: 'lg-curtain',
  templateUrl: './curtain.component.html',
  styleUrls: ['./curtain.component.scss'],
  animations: [
    trigger('leftUp', [
      transition('* => void', [
        animate('2s ease-in-out', style({ transform: 'translate(-100%,-100%)' }))
      ])
    ]),
    trigger('rigtUp', [
      transition('* => void', [
        animate('2s ease-in-out', style({ transform: 'translate(100%,-100%)' }))
      ])
    ]),
    trigger('leftDown', [
      transition('* => void', [
        animate('2s ease-in-out', style({ transform: 'translate(-100%,100%)' }))
      ])
    ]),
    trigger('rigtDown', [
      transition('* => void', [
        animate('2s ease-in-out', style({ transform: 'translate(100%,100%)' }))
      ])
    ]),
  ]
})
export class CurtainComponent implements OnInit {

  constructor(private us: UtilityService) { }
  get showContent(): boolean { return this.us.showContent }
  ngOnInit() {
    setTimeout(() =>
      this.us.showContent = true, 5000);
  }

}
