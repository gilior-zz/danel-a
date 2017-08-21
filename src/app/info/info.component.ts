import { State, process } from '@progress/kendo-data-query';
import { Component, OnInit, ViewChild, DoCheck, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Subject } from 'rxjs/Subject';
import { RTL } from "@progress/kendo-angular-l10n";


import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SupportIssue, SupportIssueResponse } from "../../models";
import { InfoService } from "../services/info.service";
import { UtilityService } from "../services/utility.service";
import { PageChangeEvent, GridDataResult, DataStateChangeEvent } from "@progress/kendo-angular-grid";
import { DataService } from "app/services/data.service";
import { HttpErrorResponse } from "@angular/common/http";
import { faqConfirmAnimation } from "app/info/faq-confirm-anim";


@Component({

  templateUrl: 'info.component.html',
  styleUrls: ['info.component.scss'],
  // encapsulation: ViewEncapsulation.None,
  providers: [{ provide: RTL, useValue: true }],
  animations: [
    faqConfirmAnimation
  ]
})
export class InfoComponent implements OnInit {
  showConfirm: boolean = false;
  faqConfiramtionMsg: string;
  public formGroup: FormGroup;

  public showFaqDlg: boolean;
  public showUpdateFaqDlg: boolean;
  private data: Array<SupportIssue>;
  public showRemoveDlg: boolean;
  constructor(public ut: UtilityService, private dataService: DataService) { }
  gridData: Array<SupportIssue>;
  public pageSize: number = 5;
  public items: Array<SupportIssue>;
  filteredData: Array<SupportIssue>;
  prbFilter: string;
  slnFilter: string;
  public gridView: GridDataResult;
  public editedRowIndex: number;


  ngOnInit() {
    this.loadFaqs();
    // this.handleAStream();
    // this.handleQStream();
  }
  lastUpdate: Date;
  private loadFaqs() {
    // this.infoService.getFaQs().subscribe(i => {
    this.dataService.GetData<SupportIssueResponse>('faq').subscribe(i => {
      this.lastUpdate = i.time;
      this.items = <Array<SupportIssue>>JSON.parse(JSON.stringify(i.sis));
      this.loadItems();


    });
  }

  get isManager(): boolean { return this.ut.isManager; }


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

  public saveHandlerReactiveDriven({ sender, rowIndex, formGroup, isNew }) {
    const si: SupportIssue = formGroup.value;

    // this.infoService.update(si).subscribe(i => {
    this.dataService.PutData<any, SupportIssue>('faq', si.id, si).subscribe(i => {
      console.log(rowIndex);
      console.log(si);
    }, (err) => {
      console.log('somthing is wrong');
    });

    sender.closeRow(rowIndex);
  }

  public saveHandlerTemplateDriven({ sender, rowIndex, dataItem, isNew }) {
    // update the data source
    // this.infoService.update(dataItem).subscribe(i => {
    this.dataService.PutData<any, SupportIssue>('faq', dataItem.id, dataItem).subscribe(i => {
      console.log(rowIndex);
      console.log(rowIndex);
      console.log(dataItem);
    });

    // close the editor, i.e revert the row back into view mode
    sender.closeRow(rowIndex);
  }

  public removeHandler({ dataItem }) {

    //this.infoService.remove(dataItem);
    this.delID = dataItem.id;
    // console.log(`dataItem ${dataItem.id}`)
    // console.log(`dataItem ${dataItem.prb}`)
    // console.log(`dataItem ${dataItem.prb}`)

    this.showRemoveDlg = true;
  }

  pageable = {
    pageSizes: [5, 10, 20, 30, 40, 50, 100, 600]
  }

  delID: number;

  delete() {
    console.log(`delete from DB ${this.delID}`);
    // this.infoService.remove(this.delID).subscribe(() => {
    this.dataService.RemoveData<Boolean>('faq', this.delID).subscribe(() => {
      let item = this.items.find(i => i.id == this.delID);
      this.items = this.items.filter(i => i != item);
      this.loadItems();
      this.showRemoveDlg = false;
      this.handleConfirmMsg("נמחק בהצלחה");
    });
  }

  deletePassword: number;

  public closeRemoveDlg(status) {
    // console.log(`Dialog result: ${status}`);

    if (status == 'yes') {

      this.delete();
    }
    else
      this.showRemoveDlg = false;

  }

  public closeFaqDlg(status, newItemWindow: any = null, ) {

    this.ut.isInvalidFiles = false;
    if (status == 'yes') {
      let sis = newItemWindow.getNewFaq();
      // this.infoService.add(sis).subscribe(i => {
      this.dataService.PostData<SupportIssue>('faq', sis).subscribe(i => {
        console.log(i);
        this.items.push(i);
        this.items = this.items.sort((a, b) => { return new Date(b.ts).getDate() - new Date(a.ts).getDate() })
        this.loadItems();
        this.showFaqDlg = false;
        this.handleConfirmMsg("נשמר בהצלחה");
      }, (err: HttpErrorResponse) => {
        if (err.status == 404) {
          this.ut.isInvalidFiles = true;
          setTimeout(() => {
            this.ut.isInvalidFiles = false;
          }, 500);
        }


      }
      );
    }
    else {
      this.showFaqDlg = false;


    }
    this.showFaqDlg = false;

  }

  handleConfirmMsg(faqConfiramtionMsg: string) {
    this.faqConfiramtionMsg = faqConfiramtionMsg;
    this.showConfirm = true;
    setTimeout(() => {
      this.showConfirm = false;
    }, 1500);
  }

  showFaqConfiramtion: boolean = false;

  public closeUpdateFaqDlg(status, updateItemWindow: any = null, ) {


    this.showUpdateFaqDlg = false;
    if (status == 'yes') {
      let sis = updateItemWindow.getNewFaq();


      // this.infoService.update(sis).subscribe(i => {
      this.dataService.PutData<any, SupportIssue>('faq', sis.id, sis).subscribe(i => {

        for (var index = 0; index < this.items.length; index++) {
          var element = this.items[index];
          if (element.id == i.id)
            this.items[index] = i;
        }
        // this.items.forEach(arrayItem => {
        //   if (i.id == arrayItem.id) {
        //     console.log('old item');
        //     console.log(arrayItem);
        //     arrayItem = i;
        //     console.log('new item');
        //     console.log(arrayItem);
        //   }



        // });




        this.items = this.items.sort((a, b) => { return new Date(b.ts).getDate() - new Date(a.ts).getDate() })
        this.loadItems();
      }, (err) => {
        console.log('somthing is wrong');
      }

      );
    }

  }


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

  getData(): Array<SupportIssue> {
    if (this.gridData == null) return;
    let l = this.gridData;

    l = l.filter(i => i.prb.includes(this.prbFilter) || this.prbFilter == null);

    return l;
  }



}
