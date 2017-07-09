import { Component } from '@angular/core';
import { UtilityService } from "app/services/utility.service";

@Component({
  selector: 'lg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lg works!';

  /**
   *
   */
  constructor(private us: UtilityService) {


  }

  get isExplorer(): boolean { return this.us.isExplorer }
}
