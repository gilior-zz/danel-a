import { Directive, Input, OnInit, HostListener, ElementRef } from '@angular/core';
import { UtilityService } from "app/services/utility.service";

@Directive({
  selector: '[lgCopy]'
})
export class CopyDirective implements OnInit {

  constructor(private er: ElementRef, private ut: UtilityService) { }

  @Input('lgCopy') copyPath: string

  ngOnInit() {

  }

  @HostListener('click') click() {
    let id: string = this.er.nativeElement.id;
    this.ut.displyCopied(id, this.copyPath);
  }

}
