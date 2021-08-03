import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { BackendService } from "../../shared/services/backend.service";
import { SensorsReadingsDataService } from "../../shared/services/sensors-readings-data.service";

@Component({
    selector: "ns-dashboard-overview",
    templateUrl: "./dashboard-overview.component.html",
    styleUrls: ["./dashboard-overview.component.scss"]
})
export class DashboardOverviewComponent implements OnInit, OnDestroy {
    private _currentHumidityValueChanged: Subscription;
    private _currentTemperatureValueChanged: Subscription;
    private _currentRainStatusChanged: Subscription;
    currentHumidityValue: number;
    currentTemperatureValue: number;
    currentRainStatus: boolean;
    hasSunLight = false;
    constructor(
        private sensorReadingDataService: SensorsReadingsDataService,
        private backendService: BackendService
        ) {}

    ngOnInit() {
        this._currentHumidityValueChanged = this.sensorReadingDataService.currentHumidity
            .subscribe(newValue => {
                this.currentHumidityValue = newValue;
            });
        this._currentTemperatureValueChanged = this.sensorReadingDataService.currentTemperature
            .subscribe(newValue=> {
                this.currentTemperatureValue = newValue;
            });
        this._currentRainStatusChanged = this.sensorReadingDataService.currentRainStatus
        .subscribe(newValue => {
            this.currentRainStatus = newValue == 1 ? true : false ;
        });

        // this.backendService.readCurrentSensorValues();
        this.backendService.testDashboardViewUIWithCurrentSensorData();
    }

    ngOnDestroy() {
        if (this._currentHumidityValueChanged) {
            this._currentHumidityValueChanged.unsubscribe();
        }
        if (this._currentTemperatureValueChanged) {
            this._currentTemperatureValueChanged.unsubscribe()
        }
        if (this._currentRainStatusChanged) {
            this._currentRainStatusChanged.unsubscribe();
        }
    }

    onSunlightTest(): void {
        this.hasSunLight = !this.hasSunLight;
    }
}
