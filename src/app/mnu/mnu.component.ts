import { Component, OnInit, HostListener } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations'
import { UtilityService } from "app/services/utility.service";
import { Router } from "@angular/router";


@Component({
  selector: 'lg-mnu',
  templateUrl: './mnu.component.html',
  styleUrls: ['./mnu.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        animate(500, keyframes([
          style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
          style({ opacity: 1, transform: 'translateX(25px)', offset: 0.3 }),
          style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
        ]))
      ]),
      transition('* => void', [
        animate(500, keyframes([
          style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
          style({ opacity: 1, transform: 'translateX(15px)', offset: 0.7 }),
          style({ opacity: 0, transform: 'translateX(-100%)', offset: 1.0 })
        ]))
      ])
    ])
  ]
})
export class MnuComponent implements OnInit {
  managerCode: number;
  constructor(private us: UtilityService, private router: Router) { }

  ngOnInit() {
  }

  menuVisible: boolean = window.pageYOffset < 30;
  pageYOffset: number = 0;
  @HostListener('window:scroll')
  doSomething() {

    this.menuVisible = this.pageYOffset > window.pageYOffset || window.pageYOffset <= 30;

    this.pageYOffset = window.pageYOffset;



  }

  // get userName():string{
  //   return this.us.windowsUserinfo.name;
  // }

  get isSystem(): boolean { return this.us.userType == 'system' }
  get userType(): string { return this.us.userType }
  set userType(val: string) { this.us.userType = val }

  onUserTypeChanged() {

  }


  get isManager(): boolean { return this.us.isManager }
  managerIn() {
    if (this.managerCode == 1234) this.us.isManager = true;
  }
  managerOut() {
    this.us.isManager = false;
  }

  goToEnvs() {
    // console.log('in goToEnvs()');
    if (this.userType == 'system')
      this.router.navigate(['/env-system']);
    else
      this.router.navigate(['/env']);
  }

  goTo(id: string) {
    // $('html, body').animate({
    //   scrollTop: $(`#${id}`).offset().top
    // }, 2000);
  }

}
