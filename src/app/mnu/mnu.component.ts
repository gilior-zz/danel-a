import { Component, OnInit, HostListener } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { UtilityService } from "app/services/utility.service";

@Component({
  selector: 'lg-mnu',
  templateUrl: './mnu.component.html',
  styleUrls: ['./mnu.component.scss'],
  animations: [
    trigger('menuState', [
      state('0', style({
        transform: 'translateY(-100%)',

      })),
      state('true', style({
        transform: 'translateY(0)'
      })),
      transition('0 => 1', animate('.5s')),
      transition('1 => 0', animate('.2s .2s'))
    ])
  ]
})
export class MnuComponent implements OnInit {
  managerCode: number;
  constructor(private us: UtilityService) { }

  ngOnInit() {
  }

  menuVisible: boolean = window.pageYOffset < 30;
  pageYOffset: number = 0;
  @HostListener('window:scroll')
  doSomething() {

    this.menuVisible = this.pageYOffset > window.pageYOffset || window.pageYOffset <= 30;

    this.pageYOffset = window.pageYOffset;



  }

  get isManager(): boolean { return this.us.isManager }
  managerIn() {
    if (this.managerCode == 1234) this.us.isManager = true;
  }
  managerOut() {
    this.us.isManager = false;
  }

  goTo(id: string) {
    // $('html, body').animate({
    //   scrollTop: $(`#${id}`).offset().top
    // }, 2000);
  }

}
