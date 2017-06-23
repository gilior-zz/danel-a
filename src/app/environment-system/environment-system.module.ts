
import { NgModule } from "@angular/core";
import { EnvironmentSystemComponent } from "app/environment-system/environment-system.component";
import { SharedModule } from "app/shared.module";
import { EnvironmentSystemRoutingModule } from "app/environment-system/environment-system.routing.module";

@NgModule({
    declarations: [
        EnvironmentSystemComponent
    ],
    imports: [
        SharedModule,
        EnvironmentSystemRoutingModule
    ],

})
export class EnvironmentSystemModule { }