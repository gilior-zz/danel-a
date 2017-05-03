import { Component, OnInit, ViewChild, DoCheck, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Subject } from 'rxjs/Subject';


import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SupportIssue } from "../../models";
import { InfoService } from "../services/info.service";
import { UtilityService } from "../services/utility.service";

@Component({
  selector: 'lg-info',
  templateUrl: 'info.component.html',
  styleUrls: ['info.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InfoComponent implements OnInit {
  public formGroup: FormGroup;

  public showFaqDlg: boolean;
  public showRemoveDlg: boolean;
  constructor(public infoService: InfoService, public ut: UtilityService) { }
  gridData: Array<SupportIssue>;
  filteredData: Array<SupportIssue>;
  prbFilter: string;
  slnFilter: string;
  public editedRowIndex: number;
  items: Observable<string[]>;
  ngOnInit() {
    this.infoService.getFaQs().subscribe(i => {
      this.gridData = <Array<SupportIssue>>JSON.parse(JSON.stringify(i));


      this.filteredData = this.gridData
    });
    this.handleAStream();
    this.handleQStream();


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

  public addHandller() {
    this.showFaqDlg = true;
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }) {
    const si: SupportIssue = formGroup.value;

    this.infoService.update(si);

    sender.closeRow(rowIndex);
  }

  public removeHandler({ dataItem }) {

    //this.infoService.remove(dataItem);
    this.delID = dataItem.id;
    console.log(`dataItem ${dataItem.id}`)
    console.log(`dataItem ${dataItem.prb}`)
    console.log(`dataItem ${dataItem.prb}`)

    this.showRemoveDlg = true;
  }

  delID: number;

  delete() {
    console.log(`delete from DB ${this.delID}`);
  }

  public closeRemoveDlg(status) {
    console.log(`Dialog result: ${status}`);
    this.showRemoveDlg = false;
    if (status == 'yes')
      this.delete();
  }

  public closeFaqDlg(status) {
    console.log(`Dialog result: ${status}`);
    this.showFaqDlg = false;
    if (status == 'yes')
      this.infoService.add(this.ut.faqToSave).subscribe(
        i => this.filteredData.push(i),
        error => console.log(error)
      );
  }


  dialogContent: string = 'למחוק רשומה?';

  public editHandler({ sender, rowIndex, dataItem }) {
    this.closeEditor(sender);

    this.formGroup = new FormGroup({
      'id': new FormControl(dataItem.id),
      'prb': new FormControl(dataItem.prb, Validators.required),
      'sln': new FormControl(dataItem.sln, Validators.required),
    });

    this.editedRowIndex = rowIndex;

    sender.editRow(rowIndex, this.formGroup);
    console.log(`rowIndex ${rowIndex}`)
    console.log(`dataItem ${dataItem.id}`)
    console.log(`dataItem ${dataItem.prb}`)
    console.log(`dataItem ${dataItem.prb}`)
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


  isGridActive: boolean = true;
  skip: number = 0;
  public searchATermStream = new Subject<string>();
  public searchQTermStream = new Subject<string>();
  searchA(term: string) { this.searchATermStream.next(term); }
  searchQ(term: string) { this.searchQTermStream.next(term); }

  getData(): Array<SupportIssue> {
    if (this.gridData == null) return;
    let l = this.gridData;

    l = l.filter(i => i.prb.includes(this.prbFilter) || this.prbFilter == null);

    return l;
  }



}
