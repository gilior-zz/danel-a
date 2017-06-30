

import { DialogModule } from '@progress/kendo-angular-dialog';

import { LayoutModule } from '@progress/kendo-angular-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { GridModule, PDFModule } from '@progress/kendo-angular-grid';
import { HttpModule } from '@angular/http';
import { TreeModule } from 'angular-tree-component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CopyDirective } from './copy.directive';
import { ComboBoxModule } from '@progress/kendo-angular-dropdowns';
import { ReCaptchaModule } from 'angular2-recaptcha';
import { LockedMdlsComponent } from './locked-mdls/locked-mdls.component';



@NgModule({
  imports: [

    CommonModule,
    TreeModule,
    HttpModule,
    GridModule,
    ComboBoxModule,
    PDFModule,
    InputsModule,
    ButtonsModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    DialogModule,
    ReCaptchaModule,
    

  ],
  exports: [
    CommonModule,
    HttpModule,
    GridModule,
    ComboBoxModule,
    PDFModule,
    InputsModule,
    ButtonsModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    DialogModule,
    TreeModule,
    ReCaptchaModule,
    CopyDirective,
    LockedMdlsComponent],
  declarations: [CopyDirective, LockedMdlsComponent]

})
export class SharedModule { }
