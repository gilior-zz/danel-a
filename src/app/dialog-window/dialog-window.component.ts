import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { UtilityService } from "../services/utility.service";


@Component({
  selector: 'lg-dialog-window',

  templateUrl: './dialog-window.component.html',
  styleUrls: ['./dialog-window.component.scss']
})
export class DialogWindowComponent implements OnInit {
  @Input() content:string;
  get showDlg():boolean{return this.ut.showFaqDlg}
  constructor(private  ut:UtilityService) { }

  ngOnInit() {
  }
  @Output() deleteRequest = new EventEmitter();

  public close(status) {
    console.log(`Dialog result: ${status}`);
    // this.ut.delRecord=status=='yes';
    if (status=='yes')
      this.deleteRequest.emit();
    this.ut.showFaqDlg=false;
  }



}
