import { Component, OnInit, Input, OnChanges, SimpleChange, OnDestroy } from '@angular/core';

@Component({
  selector: 'lg-last-update',
  templateUrl: './last-update.component.html',
  styleUrls: ['./last-update.component.scss']
})
export class LastUpdateComponent implements OnInit, OnChanges, OnDestroy {

  @Input('lastUpdate') time: Date;
  @Input('backColor') color: string;
  minDif: number;
  constructor() { }

  ngOnInit() {

  }


  interval: NodeJS.Timer;
  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (!this.time) return;
    // console.log(this.time);
    let l = new Date().getTime() - new Date(this.time).getTime()
    let ll = l / 1000 / 60;
    this.minDif = ll;
    this.interval = setInterval(() => { this.minDif++ }, 1000 * 60)
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

}
