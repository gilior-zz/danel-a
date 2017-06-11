import { Observable } from 'rxjs/observable';
import { Component, OnInit } from '@angular/core';
import { LinkResponse, Link } from "../../models";
import { LinksService } from "../services/links.service";
import { UtilityService } from "app/services/utility.service";


@Component({
  selector: 'lg-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit {
  public linkResponse: Observable<LinkResponse>;

  constructor(private linksService: LinksService, private us: UtilityService) {
  }
public isLoadingFile: boolean;
  runFile(pth: string) {
     this.isLoadingFile = true;
    this.us.runFile(pth).subscribe(i => {
      this.isLoadingFile = false;
    }, err => { this.isLoadingFile = false; })
  }

  onClick(lnk: string) {
    console.log(lnk);
    window.location.replace(lnk);

  }


  arr: Array<Array<Link>>;

  ngOnInit() {

    this.linkResponse = this.linksService.getLinks();

    // let lnks: Link[] = [];
    // for (var index = 0; index < 20; index++) {
    //   lnks.push({ nm: `nm ${index}`, pth: `pth ${index}`, ctg: `ctg ${index}` })
    // }
    // let l = lnks.find(i => i.nm == '');

  }

}
