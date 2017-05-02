import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnvironmentComponent } from "../environment/environment.component";
import { InfoComponent } from "../info/info.component";
import { LinksComponent } from "../links/links.component";


const routes: Routes = [
  { path: 'env', component: EnvironmentComponent },
  { path: 'inf', component: InfoComponent },
  { path: 'lnk', component: LinksComponent },
  { path: '', redirectTo: 'env', pathMatch: 'full' }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
