import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MdlsService } from "app/services/mdls.service";
import { Observable } from "rxjs/Observable";
import { Module } from "models";

@Component({
  selector: 'lg-locked-mdls',
  templateUrl: './locked-mdls.component.html',
  styleUrls: ['./locked-mdls.component.scss']
})
export class LockedMdlsComponent implements OnInit {
  view: Observable<Array<Module>>;
  @Output() onChanged: EventEmitter<Module>;
  constructor(private mdlsService: MdlsService) {
    this.onChanged=new EventEmitter();
   }

  ngOnInit() {
    console.log('ngOnInit LockedMdlsComponent');
    
    this.view = this.mdlsService.getLockedMdls();
  } 
  public valueChange(value: Module): void {
    console.log("valueChange", value);
    this.onChanged.emit(value);
  }

}
