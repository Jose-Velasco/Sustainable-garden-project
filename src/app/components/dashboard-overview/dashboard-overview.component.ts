import { Component, OnInit } from "@angular/core";

@Component({
    selector: "ns-dashboard-overview",
    templateUrl: "./dashboard-overview.component.html",
    styleUrls: ["./dashboard-overview.component.scss"]
})
export class DashboardOverviewComponent implements OnInit {
    hasSunLight = false;
    constructor() {}

    ngOnInit() {}

    onSunlightTest(): void {
        this.hasSunLight = !this.hasSunLight;
    }
}
