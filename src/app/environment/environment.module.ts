
import { NgModule } from '@angular/core';

import { SharedModule } from "app/shared.module";
import { EnvironmentComponent } from "app/environment/environment.component";
import { EnvironmentUnitComponent } from "app/environment-unit/environment-unit.component";
import { EnvironmentRoutingModule } from "app/environment/environment.routing.module";



@NgModule({
    declarations: [
        EnvironmentComponent,
        EnvironmentUnitComponent

    ],
    imports: [      
        SharedModule,
        EnvironmentRoutingModule
    ],

})
export class EnvironmentModule { }