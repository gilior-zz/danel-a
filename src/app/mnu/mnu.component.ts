import {Component, OnInit, HostListener} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'

@Component({
  selector: 'lg-mnu',
  templateUrl: './mnu.component.html',
  styleUrls: ['./mnu.component.scss'],
  animations: [
    trigger('menuState', [
      state('false', style({
        transform: 'translateY(-100%)',

      })),
      state('true',   style({

        transform: 'translateY(0)'
      })),
      transition('0 => 1', animate('.5s')),
      transition('1 => 0', animate('.2s .2s'))
    ])
  ]
})
export class MnuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  menuVisible:boolean=window.pageYOffset<30;
  pageYOffset:number=0;
  @HostListener('window:scroll')
  doSomething() {

    this.menuVisible=this.pageYOffset>window.pageYOffset || window.pageYOffset<=30;

    this.pageYOffset=window.pageYOffset;


  }


  goTo(id:string){
    $('html, body').animate({
      scrollTop: $(`#${id}`).offset().top
    }, 2000);
  }

}
