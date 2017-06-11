import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnvironmentComponent } from "app/environment/environment.component";



const envRoutes: Routes = [
  { path: '',  component: EnvironmentComponent },
  // { path: '',pathMatch:'full'  ,redirectTo: 'env' },
  
];

@NgModule({
  imports: [
    RouterModule.forChild(envRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class EnvironmentRoutingModule { }