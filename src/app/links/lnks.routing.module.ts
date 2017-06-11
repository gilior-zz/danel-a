import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LinksComponent } from "app/links/links.component";





const lnksRoutes: Routes = [
  { path: '',  component:LinksComponent  },
    // { path: '',pathMatch:'full'  ,redirectTo: 'lnk' },
  
];

@NgModule({
  imports: [
    RouterModule.forChild(lnksRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class LnkstRoutingModule { }