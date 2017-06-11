import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoComponent } from "app/info/info.component";




const infoRoutes: Routes = [
  { path: '',  component: InfoComponent },
    // { path: '',pathMatch:'full'  ,redirectTo: 'inf' },
  
];

@NgModule({
  imports: [
    RouterModule.forChild(infoRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class InfotRoutingModule { }