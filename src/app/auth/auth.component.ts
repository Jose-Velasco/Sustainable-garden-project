import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { BackendService } from "../shared/services/backend.service";
import { ChartsDataService } from "../shared/services/charts-data.service";

@Component({
    selector: "ns-auth",
    templateUrl: "./auth.component.html",
    styleUrls: ["auth.component.scss"]
})
export class AuthComponent implements OnInit {
    testNum: number;
    name = "";
    name2 = "";
    constructor(
        private router: RouterExtensions,
        private backendService: BackendService,
        private chartsDataService: ChartsDataService) {}

    ngOnInit() {
        this.testNum = 15;

        // TODO: this has been added here for charts view testing purposes only
        // needs to be changed
        this.backendService.fetchAllSensorsReadings();
        this.chartsDataService.initializeChartServiceData();
        // end TODO
    }

    Login() {
        this.router.navigate(["tabs"], { clearHistory: true});
        console.log("loggedIn");
    }
}
