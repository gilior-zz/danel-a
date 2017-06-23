
import { element } from 'protractor';
import {
  Component, OnInit, Output, EventEmitter, OnDestroy, ViewEncapsulation, Input
} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
// import { FileInfo } from "@progress/kendo-angular-upload";


import { Module, SupportIssueLink, SupportIssue } from "../../models";
import { UtilityService } from "../services/utility.service";
import { MdlsService } from "../services/mdls.service";



@Component({
  // encapsulation: ViewEncapsulation.None,
  selector: 'lg-faq-item',
  templateUrl: './faq-item.component.html',
  styleUrls: ['./faq-item.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-50%)' }),
        animate('.7s')
      ]),
      transition('* => void', [
        animate('.7s', style({ transform: 'translateX(-50%)' }))
      ])
    ])
  ]
})
export class FaqItemComponent implements OnInit, OnDestroy {
  mdlName: string;
  mdlID: number;
  mdls: Module[];
  faqForm: FormGroup;
  // myFiles: Array<FileInfo>;
  private lnks: FileList;

  constructor(private fb: FormBuilder, private ut: UtilityService, public ms: MdlsService) {


  }

  @Input() item: SupportIssue



  ngOnDestroy() {

    // const formModel = this.faqForm.value;
    // let links: Array<SupportIssueLink> = new Array<SupportIssueLink>();

    // for (let i = 0; this.lnks != null && i < this.lnks.length; i++) {
    //   let l: SupportIssueLink = { nm: this.lnks[0].name, pth: `$x:\lnks\{this.lnks[0].name}` };
    //   links.push(l);
    // }

    // let sis: SupportIssue = { lnks: links, sln: formModel.sln, prb: formModel.prb };
    // this.ut.faqToSave = sis;
  }

  getNewFaq(): SupportIssue {
    const formModel = this.faqForm.value;
    let links: Array<SupportIssueLink> = new Array<SupportIssueLink>();

    for (let i = 0; this.lnks != null && i < this.lnks.length; i++) {
      let l: SupportIssueLink = { nm: this.lnks[0].name, pth: `x:\\lnks\\${this.lnks[0].name}` };
      links.push(l);
    }

    console.log('formModel');

    console.log(formModel);

    let sis: SupportIssue = { mdlName: formModel.mdl, lnks: formModel.lnks, sln: formModel.sln, prb: formModel.prb, mID: formModel.mdlID, id: formModel.id };
    return sis;
  }



  createForm() {
    this.faqForm = this.fb.group({
      prb: [this.item == null ? '' : this.item.prb, Validators.required],
      sln: [this.item == null ? '' : this.item.sln, Validators.required],
      mdl: [{ value: this.item == null ? '' : this.item.mdlName, disabled: true }],
      mdlID: [this.item == null ? null : this.item.mID],
      id: [this.item == null ? null : this.item.id],
      lnks: [this.item == null ? null : this.item.lnks]
    });

    this.faqForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  fileChangeEvent(files: FileList) {


    // this.lnks = files;
    // let links: Array<SupportIssueLink> = new Array<SupportIssueLink>();
    // for (let i = 0; this.lnks != null && i < this.lnks.length; i++) {
    //   let l: SupportIssueLink = { nm: this.lnks[0].name, pth: `x:\\lnks\\${this.lnks[0].name}` };
    //   links.push(l);
    // }
    let lnks = [];
    for (let i = 0; files != null && i < files.length; i++) {


      let l: SupportIssueLink = { nm: files[i].name, pth: `x:\\lnks\\${files[i].name}` };
      lnks.push(l);
    }
    this.faqForm.get('lnks').setValue(lnks);
  }



  onValueChanged(data?: any) {
    this.faqForm.get('prb').value;
    this.faqForm.get('sln').value;

    if (!this.faqForm) { return; }
    const form = this.faqForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }
  formErrors = {
    'prb': '',
    'sln': ''
  };
  validationMessages = {
    'prb': {
      'required': 'חובה להזין בעיה.'
    },
    'sln': {
      'required': 'חובה להזין פתרון.'
    }
  };

  options = {
    allowDrag: true,
    allowDrop: false


  }

  onClear(){
     this.faqForm.get('mdl').setValue(null);
    this.faqForm.get('mdlID').setValue(null);
  }

  onDrop($event): void {
    console.log($event);
    // console.log('b4 dropped '+JSON.stringify(this.faqForm.get('mdl')) );
    this.faqForm.get('mdl').setValue($event.element.data.name);
    this.faqForm.get('mdlID').setValue($event.element.data.id);
    //  console.log('after dropped '+JSON.stringify(this.faqForm.get('mdl')) );
  }

  allowDrop(element): boolean {
    return true;
  }

  ngOnInit() {
    this.createForm();
    this.ms.getMdls().subscribe(i => {
      this.mdls = i.mdls;
    })

  }
}
