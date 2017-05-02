import {Component, OnInit} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'
import {Observable} from "rxjs";

import { RollerResponse } from "../../models";
import { RollerService } from "../services/roller.service";
import { UtilityService } from "../services/utility.service";

@Component({
  selector: 'lg-roller',
  templateUrl: './roller.component.html',
  styleUrls: ['./roller.component.scss'],
  // animations: [
  //   trigger('flyInOut', [
  //     state('in', style({transform: 'translateX(0)'})),
  //     transition('void => *', [
  //       style({transform: 'translateX(10%)'}),
  //       animate('5s',style({transform: 'translateX(-100%)'}))
  //     ])
  //   ])
  // ]
  // animations: [
  //   trigger('flyInOut', [
  //     transition('void => *', [
  //       style({transform: 'translateX(100%)'}),
  //       animate('10s',style({transform: 'translateX(-100%)'}))
  //     ])
  //   ])
  // ]
  animations: [
    trigger('flyInOut', [
      state('start', style({transform: 'translateX(100%)'})),
      state('end', style({transform: 'translateX(-100%)'})),
      transition('start => end', [
        animate('10s')
      ])
    ])
  ]
})
export class RollerComponent implements OnInit {

  message$: Observable<string>;
  private messages = [
    'You are my hero!',
    'You are the best hero!',
    'Will you be my hero?'
  ];
  spanState:string="start";
  public rollerResponse: Promise<RollerResponse>;
  constructor(private  rs:RollerService,private  us:UtilityService) { this.resend(); }
  resend() {
    this.message$ = Observable.interval(500)
      .map(i => this.messages[i])
      .take(this.messages.length);
  }

  animationDone(event ){
    // let l=this.index+=1;
    // this.index=l%this.msgs.length;
    //
    // this.spanState="start";
    // this.us.tick_then(()=>{this.spanState="end"});
    // this.showMsg=false;
    // this.us.tick_then(()=>{this.showMsg=true});

  }

  private index:number=-1;
  get msg():any{
    // if (this.msgs==null || this.index==-1) return null;
    // return this.msgs[this.index];
    return null;
  }

 get combinedMsg():string{
    // if (this.msgs==null) return null;
    // return  this.msgs.join();
   return "";
  }
  showMsg:boolean=true;
  ngOnInit() {
   this.rollerResponse= this.rs.getRllrs();
  }

}
