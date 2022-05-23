import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

import { AuthComponent } from "./auth/auth.component";
import { NewAccountPage } from "./newAccountPage/newAccountPage.component";
import { DashboardOverviewComponent } from "./components/dashboard-overview/dashboard-overview.component";
import { SensorsOverviewComponent } from "./components/sensors-overview/sensors-overview.component.";
import { TabsNavigationComponent } from "./components/tabs-navigation/tabs-navigation.component";
import { DashboardChartsComponent } from "./components/dashboard-charts/dashboard-charts.component";
import { WebViewerComponent } from "./components/web-viewer/web-viewer.component";

const routes: Routes = [
    { path: "", redirectTo: "auth", pathMatch: "full" },
    { path: "newAccountPage", component: NewAccountPage },
    { path: "auth", component: AuthComponent },
    {
        path: "tabs",
        component: TabsNavigationComponent,
        children: [
            {
                path: "dashboard-overview",
                component: DashboardOverviewComponent,
                outlet: "dashboardOverview"
            },
            {
                path: "dashboard-charts",
                component: DashboardChartsComponent,
                outlet: "dashboardCharts"
            },
        ]
    },
    { path: "dashboardOverview", component: DashboardOverviewComponent},
    { path: "sensorsOverview", component: SensorsOverviewComponent},
    { path: "web-viewer/:socialMedia", component: WebViewerComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
