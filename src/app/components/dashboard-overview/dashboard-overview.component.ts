import { Component } from "@angular/core";

@Component({
    selector: "ns-dashboard-overview",
    templateUrl: "./dashboard-overview.component.html",
    styleUrls: ["./dashboard-overview.component.scss"]
})
export class DashboardOverviewComponent {
    hasSunLight = false;
    constructor() {}

    onSunlightTest(): void {
        this.hasSunLight = !this.hasSunLight;
    }
}
