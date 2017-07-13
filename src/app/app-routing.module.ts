import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnvironmentComponent } from "app/environment/environment.component";
import { InfoComponent } from "app/info/info.component";
import { LinksComponent } from "app/links/links.component";



const routes: Routes = [
  { path: 'env', loadChildren: 'app/environment/environment.module#EnvironmentModule' },
  { path: 'env-system', loadChildren: 'app/environment-system/environment-system.module#EnvironmentSystemModule' },
  { path: 'inf', loadChildren: 'app/info/info.module#InfoModule' },
  { path: 'lnk', loadChildren: 'app/links/links.module#LinksModule' },
  { path: '', redirectTo: 'env', pathMatch: 'full' }

]

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
