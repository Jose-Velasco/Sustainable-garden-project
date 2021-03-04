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
import { TabsNavigationComponent } from "./components/tabs-navigation/tabs-navigation.component";
import { HumidityComponent } from "./shared/ui/humidity/humidity.component";
import { RainComponent } from "./shared/ui/rain/rain.component";
import { ActionBarComponent } from "./shared/ui/action-bar/action-bar.component";
import { DashboardChartsComponent } from "./components/dashboard-charts/dashboard-charts.component";
import { ThermometerChartComponent } from "./shared/ui/thermometer-chart/thermometer-chart.component";

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
        TabsNavigationComponent,
        HumidityComponent,
        RainComponent,
        ActionBarComponent,
        DashboardChartsComponent,
        ThermometerChartComponent
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
