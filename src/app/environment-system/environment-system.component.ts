import { State, process } from '@progress/kendo-data-query';
import { Component, OnInit, ViewChild, DoCheck, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Subject } from 'rxjs/Subject';


import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SupportIssue, DanelVersion } from "../../models";
import { InfoService } from "../services/info.service";
import { UtilityService } from "../services/utility.service";
import { PageChangeEvent, GridDataResult, DataStateChangeEvent } from "@progress/kendo-angular-grid";
import { FlatEnvironmentService } from "app/services/flat-environment.service";
import { EnvironmentService } from "app/services/environment.service";

@Component({

  templateUrl: 'environment-system.component.html',
  styleUrls: ['environment-system.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class EnvironmentSystemComponent implements OnInit {
  public formGroup: FormGroup;

  public showFaqDlg: boolean;
  public showUpdateFaqDlg: boolean;
  private data: Array<DanelVersion>;
  public showRemoveDlg: boolean;
  constructor(public flatEnvironmentService: FlatEnvironmentService, public ut: UtilityService, public environmentService: EnvironmentService) { }
  gridData: Array<DanelVersion>;
  public pageSize: number = 100;
  public items: Array<DanelVersion>;
  filteredData: Array<DanelVersion>;
  prbFilter: string;
  slnFilter: string;
  public gridView: GridDataResult;
  public editedRowIndex: number;


  ngOnInit() {
    this.loadFaqs();
    // this.handleAStream();
    // this.handleQStream();
  }
  loadFaqs() {
    this.flatEnvironmentService.getEnvs().subscribe(i => {
      this.items = <Array<DanelVersion>>JSON.parse(JSON.stringify(i.flatVers));
      this.loadItems();
      this.items.forEach(i => {
        let re = /\./gi;
        let winServiceName = i.winServiceName.replace(re, '^');
        let winNotificationName = i.winNotificationName.replace(re, '^');
        this.environmentService.GetListenerStatus(winServiceName, i.serverName).subscribe(j => {
          i.winListenerStatus = j;
        });
        this.environmentService.GetNotificationStatus(winNotificationName, i.serverName).subscribe(j => {
          i.winNotificationStatus = j;
        });
      })

    });

  }

  GetNotificationStatus(winNotificationName: string, serverName: string): Observable<string> {
    return this.environmentService.GetNotificationStatus(winNotificationName, serverName);
  }


  GetListenerStatus(winServiceName: string, serverName: string): Observable<string> {
    return this.environmentService.GetListenerStatus(winServiceName, serverName);
  }

  setHeaderStyle() {
    return { 'background-color': '#666', 'color': '#fff', 'line-height': '1em','text-align':'center' }
  }

  pageChange({ skip, take }: PageChangeEvent): void {
    this.skip = skip;
    this.pageSize = take;
    this.loadItems();
  }

  private loadItems(): void {
    // debugger;
    this.gridView = {
      data: this.items.slice(this.skip, this.skip + this.pageSize),
      total: this.items.length
    };
  }
  public handleQStream() {
    this.searchQTermStream
      .debounceTime(300)
      .distinctUntilChanged().subscribe(
      (term: string) => {


        // this.filteredData= this.gridData.filter(i=>i.q.includes(term))
        // this.prbFilter=term;
        // this.filteredData= this.filteredData.filter(i=>i.a.includes(this.slnFilter) || this.slnFilter==null);

        // this.filteredData = filterBy(this.gridData, {
        //   logic: 'and',
        //   filters: [
        //     { field: "prb", operator: "contains", value: term, ignoreCase: true },
        //     { field: "sln", operator: "contains", value: this.slnFilter || "", ignoreCase: true },

        //   ]
        // });
        this.prbFilter = term;

        // console.log("this.viewChild.skip "+this.viewChild.skip);
        // this.viewChild.skip-=290;
        // this.viewChild.skip=0;
        // this.isGridActive=false;
        // this.ut.tick_then(()=>{this.isGridActive=true})

      }
      )
      ;
  }

  public closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }


  public addHandler({ sender }) {
    this.showFaqDlg = true;
  }

  //  public addHandlerB({sender}) {
  //       this.closeEditor(sender);

  //       this.formGroup = new FormGroup({
  //           'sln': new FormControl(),
  //           'prb': new FormControl(""),

  //       });

  //       sender.addRow(this.formGroup);
  //   }






  pageable = {
    pageSizes: [5, 10, 20, 30, 40, 50, 100, 600]
  }

  delID: number;



  deletePassword: number;








  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridView = process(this.items, this.state);
  }

  public state: State = {
    skip: 0,
    // take: 10
  };


  dialogContent: string = 'למחוק רשומה?';

  public editHandlerReactiveDriven({ sender, rowIndex, dataItem }) {
    this.closeEditor(sender);

    this.formGroup = new FormGroup({

      'sln': new FormControl(dataItem.sln),
      'prb': new FormControl(dataItem.prb),
    });

    this.editedRowIndex = rowIndex;

    sender.editRow(rowIndex, this.formGroup);
  }



  handleCorrectCaptcha($event) {
    console.log($event);

  }

  public editHandlerTemplateDriven({ sender, rowIndex, dataItem }) {
    // close previously edited item
    this.closeEditor(sender);

    // track last edited row
    // it will be used in `closeEditor` for closing previous edited row
    this.editedRowIndex = rowIndex;

    // clone current - `[(ngModel)]` will modify the orignal item
    // we will use this copy to revert changes
    this.editedItem = Object.assign({}, dataItem);

    // edit the row
    sender.editRow(rowIndex);
  }
  editedItem: SupportIssue;

  public editHandlerModalWindow({ sender, rowIndex, dataItem }) {
    // close previously edited item
    // this.closeEditor(sender);

    // track last edited row
    // it will be used in `closeEditor` for closing previous edited row
    this.editedRowIndex = rowIndex;

    // clone current - `[(ngModel)]` will modify the orignal item
    // we will use this copy to revert changes
    this.editedItem = Object.assign({}, dataItem);
    this.showUpdateFaqDlg = true;
    // edit the row
    // sender.editRow(rowIndex);
  }









  public cancelHandler({ sender, rowIndex }) {
    this.closeEditor(sender, rowIndex);
  }

  goHome() {
    // this.viewChild.skip = 0;
  }
  handleAStream() {
    this.searchATermStream
      .debounceTime(300)
      .distinctUntilChanged().subscribe(
      (term: string) => {
        // this.filteredData = filterBy(this.gridData, {
        //   logic: 'and',
        //   filters: [
        //     { field: "sln", operator: "contains", value: term, ignoreCase: true },
        //     { field: "prb", operator: "contains", value: this.prbFilter || "", ignoreCase: true },

        //   ]
        // });
        this.slnFilter = term;
        // console.log("this.viewChild.skip "+this.viewChild.skip);
        // this.skip=0;
        // this.viewChild.skip=0;
        // this.isGridActive=false;
        // this.ut.tick_then(()=>{this.isGridActive=true})
      }
      )
      ;
  }

  isLoadingFile: boolean
  isGridActive: boolean = true;
  skip: number = 0;
  public searchATermStream = new Subject<string>();
  public searchQTermStream = new Subject<string>();
  searchA(term: string) { this.searchATermStream.next(term); }
  searchQ(term: string) { this.searchQTermStream.next(term); }

  runFile(pth: string) {
    this.ut.runFile(pth).subscribe(i => {
      this.isLoadingFile = false;
    }, err => { this.isLoadingFile = false; })
  }




}
