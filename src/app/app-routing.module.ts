import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnvironmentComponent } from "app/environment/environment.component";
import { InfoComponent } from "app/info/info.component";
import { LinksComponent } from "app/links/links.component";



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
