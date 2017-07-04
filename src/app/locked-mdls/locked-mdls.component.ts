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
  view: Array<Module>;
  allView: Array<Module>;
  @Output() onChanged: EventEmitter<Module>;
  constructor(private mdlsService: MdlsService) {
    this.onChanged = new EventEmitter();
  }

  ngOnInit() {


    this.mdlsService.getLockedMdls().subscribe(i => {
      this.view = i;
      this.allView = i;
    })

  }
  public valueChange(value: Module): void {
    this.onChanged.emit(value);
  }


  handleFilter(value) {
    this.view = this.allView.filter((s) => s.name.toLocaleLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

}
