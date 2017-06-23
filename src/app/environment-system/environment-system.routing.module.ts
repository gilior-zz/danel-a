

import { Routes, RouterModule } from "@angular/router";
import { EnvironmentSystemComponent } from "app/environment-system/environment-system.component";
import { NgModule } from "@angular/core";

const envSystemRoutes: Routes = [
  { path: '', component: EnvironmentSystemComponent },
  // { path: '',pathMatch:'full'  ,redirectTo: 'env' },

];

@NgModule({
  imports: [
    RouterModule.forChild(envSystemRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class EnvironmentSystemRoutingModule { }