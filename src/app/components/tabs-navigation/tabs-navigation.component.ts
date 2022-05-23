import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";
import { Page, isAndroid } from "@nativescript/core";

// decorator, tells angular and nativescript what component we are talking about
@Component({
    selector: "ns-tabs-navigation", //where in nativescript is this component
    templateUrl: "./tabs-navigation.component.html", // which html doc is this associated to
    styleUrls: ["./tabs-navigation.component.scss"] // which scss styling doc is this associated to
})

// the tabs navigation component "tabs-navigation" has an alias in Typescript: TabsNavigationComponent
// TabsNavigationComponent can be found in app.module.ts, not needed to be touched with Angular CLI working
export class TabsNavigationComponent implements OnInit {
    constructor(
        private router: RouterExtensions,
        private active: ActivatedRoute,
        private page: Page
    ) {}

    
    ngOnInit() {
        // when we start up, load the routes for the 
        // app to understand where we are going
        this.loadTabRoutes();
        // check if we are on android
        if (isAndroid) {
            this.page.actionBarHidden = true;
        }
    }

    // how the tabs navigate
    private loadTabRoutes() {
        this.router.navigate(
            [
                {
                    outlets:
                    {
                        // if you wish to add another tab, use this format:
                        // someComponent: ["some-component"],
                        dashboardOverview: ["dashboard-overview"],
                        dashboardCharts: ["dashboard-charts"]
                    }
                }
            ],
            { relativeTo: this.active}
        );
    }
}
