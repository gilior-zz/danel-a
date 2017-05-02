import {
  Component, OnInit, Output, EventEmitter, OnDestroy, ViewEncapsulation
} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
// import { FileInfo } from "@progress/kendo-angular-upload";


import { Module, SupportIssueLink, SupportIssue } from "../../models";
import { UtilityService } from "../services/utility.service";
import { MdlsService } from "../services/mdls.service";



@Component({
  encapsulation: ViewEncapsulation.None,
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
    this.createForm();
    
  }

  onActiveChanged($event) { 
    console.log($event.isActive);
    this.mdlID = $event.isActive ? +$event.node.data.id : -1;
    this.mdlName == $event.isActive ? $event.node.data.name : null;
    this.ut.faqToSave.mID = this.mdlID;
  }

  ngOnDestroy() {

    const formModel = this.faqForm.value;
    let links: Array<SupportIssueLink> = new Array<SupportIssueLink>();

    for (let i = 0; this.lnks != null && i < this.lnks.length; i++) {
      let l: SupportIssueLink = { nm: this.lnks[0].name, pth: `$x:\lnks\{this.lnks[0].name}` };
      links.push(l);
    }

    let sis: SupportIssue = { lnks: links, sln: formModel.sln, prb: formModel.prb };
    this.ut.faqToSave = sis;
  }



  createForm() {
    this.faqForm = this.fb.group({
      prb: ['', Validators.required],
      sln: ['', Validators.required],

    });
    this.faqForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  fileChangeEvent(files: FileList) {
    this.lnks = files;
    this.ut.faqToSave.lnks.length = 0;
    for (var index = 0; index < this.lnks.length; index++) {
      var element = this.lnks[index];
      this.ut.faqToSave.lnks.push({ nm: element.name, pth: element.name })
    }
  }

  onNodeSelected(event) {
    this.mdlID = +event.node.data.id;
    this.mdlName = event.node.data.name;
    this.ut.faqToSave.mID = this.mdlID;
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

  ngOnInit() {
    this.ms.getMdls().then(i => { this.mdls = i.mdls; console.log(this.mdls); });
    this.ut.faqToSave = new SupportIssue();
  }

}
