import { NgModule } from '@angular/core';
import { SharedModule } from "app/shared.module";
import { InfoComponent } from "app/info/info.component";
import { FaqItemComponent } from "app/faq-item/faq-item.component";
import { CommonModule } from "@angular/common";
import { InfotRoutingModule } from "app/info/info.routing.module";


@NgModule({
    declarations: [
        
        InfoComponent,
        FaqItemComponent
    ],
    imports: [
          CommonModule,
        SharedModule,
        InfotRoutingModule
    ],

})
export class InfoModule { }