import { NgModule } from '@angular/core';
import { SharedModule } from "app/shared.module";
import { LinksComponent } from "app/links/links.component";
import { LnkstRoutingModule } from "app/links/lnks.routing.module";


@NgModule({
    declarations: [

        LinksComponent
    ],
    imports: [
        SharedModule,
        LnkstRoutingModule
    ],

})
export class LinksModule { }