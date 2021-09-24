import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { TextField } from "@nativescript/core/ui/text-field";
import { BackendService } from "../shared/services/backend.service";
import { ChartsDataService } from "../shared/services/charts-data.service";

@Component({
    selector: "ns-newAccountPage",
    templateUrl: "./newAccountPage.component.html",
    styleUrls: ["newAccountPage.component.scss"]
})
export class NewAccountPage implements OnInit {

    constructor(
        private router: RouterExtensions,
        private backendService: BackendService,
        private chartsDataService: ChartsDataService) {}

    ngOnInit() {
        //this.testNum = 15;

        // TODO: this has been added here for charts view testing purposes only
        // needs to be changed
        //this.backendService.fetchAllSensorsReadings();
        //this.chartsDataService.initializeChartServiceData();
        // end TODO
    }

    AccountConfirmButton() {
        
        //TODO, make logic so that the creditals to make an account make sense
        // and that pressing the button creates a dialog that the accout was
        // successfully created and goes to the tabs
        
        this.router.navigate(["tabs"], { clearHistory: true});
        console.log("accountCreated");
        this.backendService.fetchAllSensorsReadings();
        this.chartsDataService.initializeChartServiceData();
    }
}