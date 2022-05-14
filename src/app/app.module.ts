import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptHttpClientModule, NativeScriptModule } from "@nativescript/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthComponent } from "./auth/auth.component";
import { NewAccountPage } from "./newAccountPage/newAccountPage.component";
import { DashboardOverviewComponent } from "./components/dashboard-overview/dashboard-overview.component";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { ThermometerComponent } from "./shared/ui/thermometer/thermometer.component";
import { TabsNavigationComponent } from "./components/tabs-navigation/tabs-navigation.component";
import { HumidityComponent } from "./shared/ui/humidity/humidity.component";
import { RainComponent } from "./shared/ui/rain/rain.component";
import { SoilComponent } from "./shared/ui/soil/soil.component";
import { ActionBarComponent } from "./shared/ui/action-bar/action-bar.component";
import { DashboardChartsComponent } from "./components/dashboard-charts/dashboard-charts.component";
import { ThermometerChartComponent } from "./shared/ui/thermometer-chart/thermometer-chart.component";
import { NativeScriptUIChartModule } from "nativescript-ui-chart/angular";
import { SplineAreaSeriesChart } from "./shared/ui/spline-area-series-chart/spline-area-series-chart.component";
import { LblCenterDirective } from "./shared/directives/lbl-center.directive";
import { WebViewerComponent } from "./components/web-viewer/web-viewer.component";
import { AreaSeriesChart } from "./shared/ui/area-series-chart/area-series-chart.component";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptUISideDrawerModule,
        NativeScriptUIChartModule,
        NativeScriptHttpClientModule,
    ],
    declarations: [
        AppComponent,
        AuthComponent,
        NewAccountPage,
        DashboardOverviewComponent,
        ThermometerComponent,
        TabsNavigationComponent,
        HumidityComponent,
        RainComponent,
        SoilComponent,
        ActionBarComponent,
        DashboardChartsComponent,
        ThermometerChartComponent,
        SplineAreaSeriesChart,
        LblCenterDirective,
        WebViewerComponent,
        AreaSeriesChart
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
