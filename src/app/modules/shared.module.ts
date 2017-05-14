import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DialogModule } from '@progress/kendo-angular-dialog';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { GridModule } from '@progress/kendo-angular-grid';
import { HttpModule } from '@angular/http';
import { TreeModule } from 'angular-tree-component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonModule,
    TreeModule,
    HttpModule,
    GridModule,
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
    InputsModule,
    ButtonsModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    DialogModule,
    TreeModule,
    BrowserAnimationsModule,]
})
export class SharedModule { }
