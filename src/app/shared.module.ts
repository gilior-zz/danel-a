import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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



@NgModule({
  imports: [
    CommonModule,
    TreeModule,
    HttpModule,
    GridModule,
    PDFModule,
    InputsModule,
    ButtonsModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    DialogModule,
    BrowserAnimationsModule,
  ],
  exports: [
    CommonModule,
    HttpModule,
    GridModule,
    PDFModule,
    InputsModule,
    ButtonsModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    DialogModule,
    TreeModule,
    BrowserAnimationsModule, CopyDirective],
  declarations: [CopyDirective, CopyDirective]

})
export class SharedModule { }
