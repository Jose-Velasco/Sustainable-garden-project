import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";
import { Page, isAndroid } from "@nativescript/core";

@Component({
    selector: "ns-tabs-navigation",
    templateUrl: "./tabs-navigation.component.html",
    styleUrls: ["./tabs-navigation.component.scss"]
})
export class TabsNavigationComponent implements OnInit {
    constructor(
        private router: RouterExtensions,
        private active: ActivatedRoute,
        private page: Page
    ) {}

    ngOnInit() {
        this.loadTabRoutes();
        if (isAndroid) {
            this.page.actionBarHidden = true;
        }
    }

    private loadTabRoutes() {
        this.router.navigate(
            [
                {
                    outlets:
                    {
                        dashboardOverview: ["dashboard-overview"]
                    }
                }
            ],
            { relativeTo: this.active}
        );
    }
}
