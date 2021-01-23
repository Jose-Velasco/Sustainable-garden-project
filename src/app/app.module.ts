import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "@nativescript/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";
import { AuthComponent } from "./auth/auth.component";
import { DashboardOverviewComponent } from "./components/dashboard-overview/dashboard-overview.component";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { ThermometerComponent } from "./shared/ui/thermometer/thermometer.component";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptUISideDrawerModule,
    ],
    declarations: [
        AppComponent,
        ItemsComponent,
        ItemDetailComponent,
        AuthComponent,
        DashboardOverviewComponent,
        ThermometerComponent,
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
